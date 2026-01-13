from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import Dict, Any, List

from ..database import get_db
from ..models import Session as PracticeSession, Evaluation, UserProgress
from ..schemas import DashboardStats, SessionWithEvaluation

router = APIRouter(prefix="/api/stats", tags=["stats"])


@router.get("", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get dashboard statistics."""
    # Get or create user progress
    progress = db.query(UserProgress).first()
    if not progress:
        progress = UserProgress()
        db.add(progress)
        db.commit()
        db.refresh(progress)

    # Get recent sessions
    recent_sessions = (
        db.query(PracticeSession)
        .filter(PracticeSession.status == "completed")
        .order_by(desc(PracticeSession.completed_at))
        .limit(10)
        .all()
    )

    # Get score history (last 10 evaluations)
    evaluations = (
        db.query(Evaluation)
        .order_by(desc(Evaluation.created_at))
        .limit(10)
        .all()
    )

    score_history = [
        {
            "date": e.created_at.isoformat() if e.created_at else "",
            "overall": e.overall_score,
            "communication": e.communication_score,
            "problem_solving": e.problem_solving_score,
            "code_quality": e.code_quality_score
        }
        for e in reversed(evaluations)
    ]

    # Calculate skill breakdown (average scores)
    if evaluations:
        skill_breakdown = {
            "communication": sum(e.communication_score for e in evaluations) / len(evaluations),
            "problem_solving": sum(e.problem_solving_score for e in evaluations) / len(evaluations),
            "code_quality": sum(e.code_quality_score for e in evaluations) / len(evaluations),
            "speed": 7.0,  # Placeholder
            "edge_cases": 6.5  # Placeholder
        }
    else:
        skill_breakdown = {
            "communication": 0,
            "problem_solving": 0,
            "code_quality": 0,
            "speed": 0,
            "edge_cases": 0
        }

    return DashboardStats(
        total_sessions=progress.total_sessions,
        average_score=round(progress.average_score, 1),
        streak_days=progress.streak_days,
        badges=progress.badges or [],
        recent_sessions=recent_sessions,
        score_history=score_history,
        skill_breakdown=skill_breakdown
    )
