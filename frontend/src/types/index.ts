export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  starter_code: {
    python: string;
    javascript: string;
  };
  test_cases?: TestCase[];
  hints?: string[];
  created_at?: string;
}

export interface TestCase {
  input: Record<string, unknown>;
  expected: unknown;
}

export interface Session {
  id: number;
  problem_id: number;
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  code?: string;
  language: string;
  transcription?: string;
  hints_used: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  evaluation?: Evaluation;
  problem?: Problem;
}

export interface Evaluation {
  id: number;
  session_id: number;
  communication_score: number;
  problem_solving_score: number;
  code_quality_score: number;
  overall_score: number;
  feedback: string;
  strengths?: string[];
  improvements?: string[];
  created_at: string;
}

export interface DashboardStats {
  total_sessions: number;
  average_score: number;
  streak_days: number;
  badges: string[];
  recent_sessions: Session[];
  score_history: ScoreHistoryItem[];
  skill_breakdown: Record<string, number>;
}

export interface ScoreHistoryItem {
  date: string;
  overall: number;
  communication: number;
  problem_solving: number;
  code_quality: number;
}

export interface TranscriptionResponse {
  transcription: string;
  duration_seconds: number;
}
