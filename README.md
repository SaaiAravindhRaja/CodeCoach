# CodeCoach

**Master Technical Interviews: Code + Communicate**

CodeCoach is the only platform that evaluates both your **code quality** AND **communication clarity**. Because great engineers need to be great communicators.

![CodeCoach](https://img.shields.io/badge/CodeCoach-AI%20Powered-8b5cf6?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square)
![Claude](https://img.shields.io/badge/Claude-Sonnet%204-ff6b35?style=flat-square)

## The Problem

Traditional interview prep platforms only test your code. But real interviews evaluate:
- How clearly you explain your approach
- How you think through problems aloud
- How you handle questions and edge cases

**CodeCoach fills this gap.**

## Features

- **Split-Screen Practice**: Code editor + voice recorder, just like a real interview
- **AI Evaluation**: Claude Sonnet 4 analyzes both your code AND verbal explanation
- **Smart Hints**: Get help without giving away the answer (with score penalties)
- **Live Timer**: Track your time with urgency indicators
- **Progress Dashboard**: Radar charts, score trends, badges, and streaks
- **5 Classic Problems**: Two Sum, Valid Parentheses, Reverse Linked List, Binary Search, FizzBuzz

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### 1. Clone & Setup

```bash
cd CodeCoach

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Frontend setup
cd ../frontend
npm install
```

### 2. Configure API Keys

Edit `backend/.env`:
```
ELEVENLABS_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
```

> **Note**: The app works without API keys using mock responses for development/demo.

### 3. Run the App

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| Code Editor | Monaco Editor (VS Code) |
| State | Zustand |
| Charts | Recharts |
| Animations | Framer Motion |
| Backend | FastAPI, SQLAlchemy |
| Database | SQLite |
| AI | Claude Sonnet 4 (Anthropic) |
| Speech-to-Text | ElevenLabs |

## How It Works

1. **Select a Problem** - Choose from 5 classic coding problems
2. **Code & Explain** - Write your solution while recording your verbal explanation
3. **Submit** - Your audio is transcribed and sent to Claude for analysis
4. **Get Feedback** - Receive detailed scores on:
   - Communication Clarity (1-10)
   - Problem-Solving Methodology (1-10)
   - Code Quality (1-10)
   - Overall Interview Readiness (1-10)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/problems` | List all problems |
| GET | `/api/problems/{id}` | Get problem details |
| POST | `/api/sessions` | Start new session |
| POST | `/api/sessions/{id}/audio` | Upload audio recording |
| POST | `/api/sessions/{id}/submit` | Submit for evaluation |
| GET | `/api/sessions` | Get practice history |
| GET | `/api/stats` | Get dashboard stats |

## Project Structure

```
CodeCoach/
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Zustand state
│   │   └── services/       # API client
│   └── ...
├── backend/
│   ├── app/
│   │   ├── main.py         # FastAPI app
│   │   ├── models.py       # Database models
│   │   ├── routers/        # API routes
│   │   └── services/       # Business logic
│   └── ...
└── README.md
```

## Scoring System

| Dimension | What We Evaluate |
|-----------|------------------|
| **Communication** | Did you explain your approach? Think aloud? |
| **Problem Solving** | Did you discuss edge cases? Trade-offs? |
| **Code Quality** | Is it correct? Efficient? Readable? |
| **Overall** | Holistic interview readiness (hint penalty applied) |

## Demo Mode

Without API keys, CodeCoach runs in demo mode:
- Transcription returns placeholder text
- Evaluation provides mock (but realistic) feedback

This is perfect for:
- Development
- Testing UI/UX
- Hackathon demos

## Contributing

PRs welcome! Please read our contributing guidelines.

## License

MIT License - see LICENSE file

---

Built with AI for the next generation of software engineers.

**CodeCoach** - *Because great code deserves great communication.*
