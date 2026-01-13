from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    difficulty = Column(String(20), nullable=False)  # easy, medium, hard
    description = Column(Text, nullable=False)
    starter_code = Column(JSON, nullable=False)  # {"python": "...", "javascript": "..."}
    test_cases = Column(JSON, nullable=True)  # [{"input": ..., "expected": ...}]
    hints = Column(JSON, nullable=True)  # ["hint1", "hint2", "hint3"]
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    sessions = relationship("Session", back_populates="problem")


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    code = Column(Text, nullable=True)
    language = Column(String(50), default="python")
    audio_file_path = Column(String(500), nullable=True)
    transcription = Column(Text, nullable=True)
    hints_used = Column(Integer, default=0)
    status = Column(String(20), default="in_progress")  # in_progress, completed, abandoned

    problem = relationship("Problem", back_populates="sessions")
    evaluation = relationship("Evaluation", back_populates="session", uselist=False)


class Evaluation(Base):
    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), unique=True, nullable=False)
    communication_score = Column(Integer, nullable=False)
    problem_solving_score = Column(Integer, nullable=False)
    code_quality_score = Column(Integer, nullable=False)
    overall_score = Column(Integer, nullable=False)
    feedback = Column(Text, nullable=False)
    strengths = Column(JSON, nullable=True)  # ["strength1", "strength2"]
    improvements = Column(JSON, nullable=True)  # ["improvement1", "improvement2"]
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("Session", back_populates="evaluation")


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    total_sessions = Column(Integer, default=0)
    average_score = Column(Float, default=0.0)
    streak_days = Column(Integer, default=0)
    last_practice_date = Column(DateTime(timezone=True), nullable=True)
    badges = Column(JSON, default=list)  # ["first_solve", "perfect_score", ...]
