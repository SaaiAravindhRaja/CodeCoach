<p align="center">
  <img src="CodeCoachLogo.png" alt="CodeCoach Logo" width="180" />
</p>

<h1 align="center">CodeCoach</h1>

<p align="center">
  <strong>AI-powered technical interview practice that evaluates both code quality and communication clarity.</strong>
</p>

<p align="center">
  <a href="https://frontend-nine-hazel-20.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Try%20It-00f0ff?style=for-the-badge" alt="Live Demo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Claude-Sonnet%204-ff6b35?style=flat-square" alt="Claude" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square" alt="TypeScript" />
</p>

---

## The Problem

Traditional interview prep platforms only test your code. But real interviews evaluate:

- How you **think aloud** and explain your approach
- How you handle **edge cases** and trade-offs
- How you **communicate** under pressure

**CodeCoach evaluates both your code AND your communication.**

## Features

| Feature | Description |
|---------|-------------|
| **Split-Screen Practice** | Code editor + voice recorder, just like a real interview |
| **AI Evaluation** | Claude analyzes your code AND verbal explanation |
| **Smart Hints** | Get help without giving away the answer (with score penalties) |
| **Progress Dashboard** | Radar charts, score trends, badges, and streaks |

## Demo

**[Try the live demo →](https://frontend-nine-hazel-20.vercel.app)**

> Works in demo mode without API keys. Full AI evaluation requires Anthropic + ElevenLabs keys.

## Tech Stack

```
Frontend          Backend           AI
─────────         ───────           ──
React 18          FastAPI           Claude Sonnet 4
TypeScript        SQLAlchemy        ElevenLabs STT
Vite              SQLite
Tailwind CSS
Monaco Editor
Framer Motion
Zustand
```

## Quick Start

```bash
# Clone
git clone https://github.com/SaaiAravindhRaja/CodeCoach.git && cd CodeCoach

# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Add API keys (optional)
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

Open **[localhost:5173](http://localhost:5173)**

## How It Works

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Select    │ → │    Code     │ → │   Submit    │ → │   Review    │
│   Problem   │    │  & Explain  │    │     AI      │    │   Scores    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

**Scoring Dimensions:**
- **Communication** — Did you explain your approach clearly?
- **Problem Solving** — Did you consider edge cases and trade-offs?
- **Code Quality** — Is it correct, efficient, and readable?
- **Overall** — Holistic interview readiness score

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/problems` | List all problems |
| `GET` | `/api/problems/{id}` | Get problem details |
| `POST` | `/api/sessions` | Start new session |
| `POST` | `/api/sessions/{id}/submit` | Submit for AI evaluation |
| `GET` | `/api/stats` | Get dashboard statistics |

## License

MIT

---

<p align="center">
  <strong>CodeCoach</strong> — Great code deserves great communication.
</p>
