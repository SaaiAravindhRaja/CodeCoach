from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from datetime import datetime
import os
import uuid
from pathlib import Path

from ..database import get_db
from ..models import Session as PracticeSession, Problem, Evaluation, UserProgress
from ..schemas import (
    SessionCreate, SessionSubmit, SessionResponse,
    SessionWithEvaluation, TranscriptionResponse
)
from ..services.transcription import transcribe_audio
from ..services.evaluation import evaluate_session

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

UPLOAD_DIR = Path(__file__).parent.parent.parent / "uploads"


@router.post("", response_model=SessionResponse)
def create_session(session: SessionCreate, db: Session = Depends(get_db)):
    """Start a new practice session."""
    # Verify problem exists
    problem = db.query(Problem).filter(Problem.id == session.problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    db_session = PracticeSession(
        problem_id=session.problem_id,
        language=session.language,
        status="in_progress"
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.get("", response_model=List[SessionWithEvaluation])
def get_sessions(limit: int = 10, db: Session = Depends(get_db)):
    """Get recent practice sessions with evaluations."""
    sessions = (
        db.query(PracticeSession)
        .filter(PracticeSession.status == "completed")
        .order_by(desc(PracticeSession.completed_at))
        .limit(limit)
        .all()
    )
    return sessions


@router.get("/{session_id}", response_model=SessionWithEvaluation)
def get_session(session_id: int, db: Session = Depends(get_db)):
    """Get a specific session with evaluation."""
    session = db.query(PracticeSession).filter(PracticeSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("/{session_id}/audio", response_model=TranscriptionResponse)
async def upload_audio(
    session_id: int,
    request: Request,
    audio: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload audio recording and get transcription."""
    session = db.query(PracticeSession).filter(PracticeSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Extract user API key from header
    elevenlabs_key = request.headers.get("X-ElevenLabs-Key")

    # Save audio file
    UPLOAD_DIR.mkdir(exist_ok=True)
    file_ext = audio.filename.split(".")[-1] if audio.filename else "webm"
    file_name = f"{session_id}_{uuid.uuid4()}.{file_ext}"
    file_path = UPLOAD_DIR / file_name

    content = await audio.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # Transcribe audio
    transcription_result = await transcribe_audio(str(file_path), api_key=elevenlabs_key)

    # Update session
    session.audio_file_path = str(file_path)
    session.transcription = transcription_result["text"]
    db.commit()

    return TranscriptionResponse(
        transcription=transcription_result["text"],
        duration_seconds=transcription_result.get("duration", 0)
    )


@router.post("/{session_id}/submit", response_model=SessionWithEvaluation)
async def submit_session(
    session_id: int,
    submission: SessionSubmit,
    request: Request,
    db: Session = Depends(get_db)
):
    """Submit code and get AI evaluation."""
    session = db.query(PracticeSession).filter(PracticeSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Extract user API key from header
    anthropic_key = request.headers.get("X-Anthropic-Key")

    problem = db.query(Problem).filter(Problem.id == session.problem_id).first()

    # Update session with code
    session.code = submission.code
    session.language = submission.language
    session.hints_used = submission.hints_used
    session.completed_at = datetime.utcnow()
    session.duration_seconds = int((session.completed_at - session.started_at).total_seconds())
    session.status = "completed"

    # Get AI evaluation
    eval_result = await evaluate_session(
        problem=problem,
        code=submission.code,
        transcription=session.transcription or "",
        language=submission.language,
        duration_seconds=session.duration_seconds,
        hints_used=submission.hints_used,
        api_key=anthropic_key
    )

    # Save evaluation
    evaluation = Evaluation(
        session_id=session_id,
        communication_score=eval_result["communication_score"],
        problem_solving_score=eval_result["problem_solving_score"],
        code_quality_score=eval_result["code_quality_score"],
        overall_score=eval_result["overall_score"],
        feedback=eval_result["feedback"],
        strengths=eval_result.get("strengths", []),
        improvements=eval_result.get("improvements", [])
    )
    db.add(evaluation)

    # Update user progress
    progress = db.query(UserProgress).first()
    if not progress:
        progress = UserProgress()
        db.add(progress)

    progress.total_sessions += 1
    all_evals = db.query(Evaluation).all()
    if all_evals:
        progress.average_score = sum(e.overall_score for e in all_evals) / len(all_evals)
    progress.last_practice_date = datetime.utcnow()

    # Check for badges
    badges = list(progress.badges) if progress.badges else []
    if progress.total_sessions == 1 and "first_solve" not in badges:
        badges.append("first_solve")
    if eval_result["overall_score"] == 10 and "perfect_score" not in badges:
        badges.append("perfect_score")
    if eval_result["communication_score"] >= 9 and "clear_communicator" not in badges:
        badges.append("clear_communicator")
    progress.badges = badges

    db.commit()
    db.refresh(session)

    return session
