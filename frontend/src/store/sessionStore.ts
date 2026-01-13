import { create } from 'zustand';
import type { Problem, Session, Evaluation } from '../types';

interface SessionState {
  // Current session
  currentSession: Session | null;
  currentProblem: Problem | null;

  // Code editor state
  code: string;
  language: 'python' | 'javascript';

  // Recording state
  isRecording: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  transcription: string;

  // Timer state
  startTime: number | null;
  elapsedSeconds: number;

  // Hints
  hintsUsed: number;
  showHints: boolean;

  // Submission state
  isSubmitting: boolean;
  isTranscribing: boolean;
  evaluation: Evaluation | null;

  // Actions
  setCurrentSession: (session: Session | null) => void;
  setCurrentProblem: (problem: Problem | null) => void;
  setCode: (code: string) => void;
  setLanguage: (language: 'python' | 'javascript') => void;
  setIsRecording: (isRecording: boolean) => void;
  setRecordingTime: (time: number) => void;
  setAudioBlob: (blob: Blob | null) => void;
  setTranscription: (transcription: string) => void;
  startTimer: () => void;
  updateElapsedTime: () => void;
  useHint: () => void;
  setShowHints: (show: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsTranscribing: (isTranscribing: boolean) => void;
  setEvaluation: (evaluation: Evaluation | null) => void;
  reset: () => void;
}

const initialState = {
  currentSession: null,
  currentProblem: null,
  code: '',
  language: 'python' as const,
  isRecording: false,
  recordingTime: 0,
  audioBlob: null,
  transcription: '',
  startTime: null,
  elapsedSeconds: 0,
  hintsUsed: 0,
  showHints: false,
  isSubmitting: false,
  isTranscribing: false,
  evaluation: null,
};

export const useSessionStore = create<SessionState>((set, get) => ({
  ...initialState,

  setCurrentSession: (session) => set({ currentSession: session }),
  setCurrentProblem: (problem) => {
    const language = get().language;
    const starterCode = problem?.starter_code?.[language] || '';
    set({ currentProblem: problem, code: starterCode });
  },
  setCode: (code) => set({ code }),
  setLanguage: (language) => {
    const problem = get().currentProblem;
    const starterCode = problem?.starter_code?.[language] || '';
    set({ language, code: starterCode });
  },
  setIsRecording: (isRecording) => set({ isRecording }),
  setRecordingTime: (recordingTime) => set({ recordingTime }),
  setAudioBlob: (audioBlob) => set({ audioBlob }),
  setTranscription: (transcription) => set({ transcription }),
  startTimer: () => set({ startTime: Date.now() }),
  updateElapsedTime: () => {
    const { startTime } = get();
    if (startTime) {
      set({ elapsedSeconds: Math.floor((Date.now() - startTime) / 1000) });
    }
  },
  useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),
  setShowHints: (showHints) => set({ showHints }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsTranscribing: (isTranscribing) => set({ isTranscribing }),
  setEvaluation: (evaluation) => set({ evaluation }),
  reset: () => set(initialState),
}));
