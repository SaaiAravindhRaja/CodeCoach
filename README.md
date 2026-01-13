# CodeCoach

AI-powered technical interview practice that evaluates both **code quality** and **communication clarity**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20It-00f0ff?style=for-the-badge)](https://frontend-nine-hazel-20.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square)](https://fastapi.tiangolo.com)
[![Claude](https://img.shields.io/badge/Claude-Sonnet%204-ff6b35?style=flat-square)](https://anthropic.com)

## Why CodeCoach?

Traditional platforms only test code. Real interviews evaluate how you **think aloud**, explain your approach, and handle edge cases. CodeCoach evaluates both.

## Features

- **Split-Screen Practice** — Code editor + voice recorder, like a real interview
- **AI Evaluation** — Claude analyzes your code AND verbal explanation
- **Smart Hints** — Get help without giving away the answer (with penalties)
- **Progress Tracking** — Radar charts, score trends, badges, streaks

## Demo

**[Try the live demo →](https://frontend-nine-hazel-20.vercel.app)**

> Runs in mock mode without API keys. Full functionality requires Anthropic + ElevenLabs keys.

## Tech Stack

| Frontend | Backend | AI |
|----------|---------|-----|
| React 18, TypeScript, Vite | FastAPI, SQLAlchemy | Claude Sonnet 4 |
| Tailwind CSS, Framer Motion | SQLite | ElevenLabs STT |
| Monaco Editor, Zustand | | |

## Quick Start

```bash
# Clone
git clone https://github.com/SaaiAravindhRaja/CodeCoach.git
cd CodeCoach

# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Add your API keys
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install && npm run dev
```

Open [localhost:5173](http://localhost:5173)

## How It Works

1. **Select** a problem (Two Sum, Valid Parentheses, etc.)
2. **Code & Explain** your solution while recording
3. **Submit** for AI evaluation
4. **Review** scores: Communication, Problem Solving, Code Quality, Overall

## API

| Endpoint | Description |
|----------|-------------|
| `GET /api/problems` | List problems |
| `POST /api/sessions` | Start session |
| `POST /api/sessions/{id}/submit` | Submit for evaluation |
| `GET /api/stats` | Dashboard stats |

## License

MIT

---

**CodeCoach** — Great code deserves great communication.
