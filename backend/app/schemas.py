from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


# Problem Schemas
class ProblemBase(BaseModel):
    title: str
    slug: str
    difficulty: str
    description: str
    starter_code: Dict[str, str]
    test_cases: Optional[List[Dict[str, Any]]] = None
    hints: Optional[List[str]] = None


class ProblemCreate(ProblemBase):
    pass


class ProblemResponse(ProblemBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ProblemListItem(BaseModel):
    id: int
    title: str
    slug: str
    difficulty: str

    class Config:
        from_attributes = True


# Session Schemas
class SessionCreate(BaseModel):
    problem_id: int
    language: Optional[str] = "python"


class SessionSubmit(BaseModel):
    code: str
    language: Optional[str] = "python"
    hints_used: Optional[int] = 0


class SessionResponse(BaseModel):
    id: int
    problem_id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    code: Optional[str] = None
    language: str
    transcription: Optional[str] = None
    hints_used: int
    status: str

    class Config:
        from_attributes = True


class SessionWithEvaluation(SessionResponse):
    evaluation: Optional["EvaluationResponse"] = None
    problem: Optional[ProblemListItem] = None


# Evaluation Schemas
class EvaluationResponse(BaseModel):
    id: int
    session_id: int
    communication_score: int
    problem_solving_score: int
    code_quality_score: int
    overall_score: int
    feedback: str
    strengths: Optional[List[str]] = None
    improvements: Optional[List[str]] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Stats Schemas
class DashboardStats(BaseModel):
    total_sessions: int
    average_score: float
    streak_days: int
    badges: List[str]
    recent_sessions: List[SessionWithEvaluation]
    score_history: List[Dict[str, Any]]
    skill_breakdown: Dict[str, float]


# API Response Schemas
class TranscriptionResponse(BaseModel):
    transcription: str
    duration_seconds: float


class EvaluationRequest(BaseModel):
    code: str
    transcription: str
    hints_used: Optional[int] = 0


# Update forward reference
SessionWithEvaluation.model_rebuild()
