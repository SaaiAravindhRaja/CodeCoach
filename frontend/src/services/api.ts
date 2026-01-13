import type { Problem, Session, DashboardStats, TranscriptionResponse } from '../types';
import { apiKeyService } from './apiKeys';

const API_BASE = import.meta.env.PROD
  ? 'https://codecoach-api.onrender.com/api'
  : '/api';

function getApiKeyHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};

  const anthropicKey = apiKeyService.getAnthropicKey();
  const elevenLabsKey = apiKeyService.getElevenLabsKey();

  if (anthropicKey) headers['X-Anthropic-Key'] = anthropicKey;
  if (elevenLabsKey) headers['X-ElevenLabs-Key'] = elevenLabsKey;

  return headers;
}

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getApiKeyHeaders(),
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
}

// Problems API
export async function getProblems(): Promise<Problem[]> {
  return fetchJSON<Problem[]>('/problems');
}

export async function getProblem(id: number): Promise<Problem> {
  return fetchJSON<Problem>(`/problems/${id}`);
}

export async function getProblemBySlug(slug: string): Promise<Problem> {
  return fetchJSON<Problem>(`/problems/slug/${slug}`);
}

// Sessions API
export async function createSession(problemId: number, language: string = 'python'): Promise<Session> {
  return fetchJSON<Session>('/sessions', {
    method: 'POST',
    body: JSON.stringify({ problem_id: problemId, language }),
  });
}

export async function getSession(sessionId: number): Promise<Session> {
  return fetchJSON<Session>(`/sessions/${sessionId}`);
}

export async function getSessions(limit: number = 10): Promise<Session[]> {
  return fetchJSON<Session[]>(`/sessions?limit=${limit}`);
}

export async function uploadAudio(sessionId: number, audioBlob: Blob): Promise<TranscriptionResponse> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const response = await fetch(`${API_BASE}/sessions/${sessionId}/audio`, {
    method: 'POST',
    headers: getApiKeyHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload audio');
  }

  return response.json();
}

export async function submitSession(
  sessionId: number,
  code: string,
  language: string = 'python',
  hintsUsed: number = 0
): Promise<Session> {
  return fetchJSON<Session>(`/sessions/${sessionId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ code, language, hints_used: hintsUsed }),
  });
}

// Stats API
export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchJSON<DashboardStats>('/stats');
}
