from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .database import init_db
from .routers import problems, sessions, stats
from .seed import seed_problems

# Load environment variables
load_dotenv()

app = FastAPI(
    title="CodeCoach API",
    description="Technical interview practice platform - evaluate code AND communication",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://frontend-nine-hazel-20.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(problems.router)
app.include_router(sessions.router)
app.include_router(stats.router)


@app.on_event("startup")
def startup_event():
    """Initialize database and seed data on startup."""
    init_db()
    seed_problems()


@app.get("/")
def root():
    return {
        "message": "Welcome to CodeCoach API",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "codecoach-api"}
