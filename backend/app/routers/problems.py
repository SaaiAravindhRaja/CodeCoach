from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Problem
from ..schemas import ProblemResponse, ProblemListItem

router = APIRouter(prefix="/api/problems", tags=["problems"])


@router.get("", response_model=List[ProblemListItem])
def get_problems(db: Session = Depends(get_db)):
    """Get all problems (list view)."""
    problems = db.query(Problem).order_by(Problem.id).all()
    return problems


@router.get("/{problem_id}", response_model=ProblemResponse)
def get_problem(problem_id: int, db: Session = Depends(get_db)):
    """Get a specific problem with full details."""
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem


@router.get("/slug/{slug}", response_model=ProblemResponse)
def get_problem_by_slug(slug: str, db: Session = Depends(get_db)):
    """Get a specific problem by slug."""
    problem = db.query(Problem).filter(Problem.slug == slug).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem
