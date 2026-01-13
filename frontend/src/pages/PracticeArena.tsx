import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { ArrowLeft, Send, Loader2, Lightbulb, Zap, Flame, Skull, Terminal, ChevronRight } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { getProblem, createSession, uploadAudio, submitSession } from '../services/api';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { Timer } from '../components/Timer';
import { HintModal } from '../components/HintModal';

export function PracticeArena() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();

  const {
    currentProblem,
    currentSession,
    code,
    language,
    transcription,
    audioBlob,
    hintsUsed,
    showHints,
    isSubmitting,
    isTranscribing,
    setCurrentProblem,
    setCurrentSession,
    setCode,
    setLanguage,
    setTranscription,
    setShowHints,
    setIsSubmitting,
    setIsTranscribing,
    startTimer,
    reset,
  } = useSessionStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initSession() {
      if (!problemId) return;

      try {
        reset();
        const problem = await getProblem(parseInt(problemId));
        setCurrentProblem(problem);

        const session = await createSession(problem.id, language);
        setCurrentSession(session);
        startTimer();
      } catch (err) {
        setError('Failed to load problem');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    initSession();
  }, [problemId]);

  const handleSubmit = useCallback(async () => {
    if (!currentSession || !code.trim()) {
      setError('Please write some code before submitting');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (audioBlob) {
        setIsTranscribing(true);
        const result = await uploadAudio(currentSession.id, audioBlob);
        setTranscription(result.transcription);
        setIsTranscribing(false);
      }

      const result = await submitSession(
        currentSession.id,
        code,
        language,
        hintsUsed
      );

      navigate(`/results/${result.id}`);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setIsTranscribing(false);
    }
  }, [currentSession, code, language, audioBlob, hintsUsed, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="flex items-center gap-3 text-muted font-mono">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Terminal size={20} />
          </motion.div>
          <span>INITIALIZING SESSION...</span>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="text-center">
          <p className="text-muted mb-4 font-mono">PROBLEM NOT FOUND</p>
          <button
            onClick={() => navigate('/problems')}
            className="btn-secondary"
          >
            <ArrowLeft size={16} />
            BACK TO PROBLEMS
          </button>
        </div>
      </div>
    );
  }

  const difficultyConfig = {
    easy: { class: 'badge-easy', icon: Zap },
    medium: { class: 'badge-medium', icon: Flame },
    hard: { class: 'badge-hard', icon: Skull },
  };

  const DiffIcon = difficultyConfig[currentProblem.difficulty].icon;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-void">
      {/* Top bar - cyber styled */}
      <div className="flex-shrink-0 border-b border-surface-100/30 bg-surface-300/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left side - problem info */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/problems')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-300/50 border border-surface-100 text-muted hover:text-white hover:border-cyber/50 transition-all"
            >
              <ArrowLeft size={16} />
            </button>

            <div className="hidden sm:block h-6 w-px bg-surface-100" />

            <div className="flex items-center gap-3">
              <span className="font-display text-lg text-white">
                {currentProblem.title}
              </span>
              <span className={difficultyConfig[currentProblem.difficulty].class}>
                <DiffIcon size={12} />
                {currentProblem.difficulty.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Right side - actions */}
          <div className="flex items-center gap-3">
            {/* Timer */}
            <Timer />

            {/* Hints button */}
            {currentProblem.hints && currentProblem.hints.length > 0 && (
              <button
                onClick={() => setShowHints(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-300/50 border border-surface-100 text-muted hover:text-heat hover:border-heat/50 transition-all text-xs font-mono"
              >
                <Lightbulb size={14} />
                <span className="hidden sm:inline">HINTS</span>
                <span className="text-heat">{hintsUsed}/{currentProblem.hints.length}</span>
              </button>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !code.trim()}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">
                    {isTranscribing ? 'TRANSCRIBING...' : 'EVALUATING...'}
                  </span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span className="hidden sm:inline">SUBMIT</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 px-4 py-3 bg-danger/10 border-b border-danger/30 text-danger text-sm font-mono"
        >
          ERROR: {error}
        </motion.div>
      )}

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Left panel - Problem & Editor */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-surface-100/30">
          {/* Problem description */}
          <div className="flex-shrink-0 border-b border-surface-100/30 bg-surface-300/20">
            <div className="px-4 py-2 border-b border-surface-100/20 flex items-center gap-2">
              <Terminal size={14} className="text-cyber" />
              <span className="text-xs font-mono text-cyber tracking-wider">PROBLEM DESCRIPTION</span>
            </div>
            <div className="p-4 max-h-40 overflow-y-auto">
              <div className="text-sm text-muted leading-relaxed whitespace-pre-wrap font-mono">
                {currentProblem.description}
              </div>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex-shrink-0 flex items-center gap-3 px-4 py-2 border-b border-surface-100/30 bg-surface-300/20">
            <span className="text-xs font-mono text-muted tracking-wider">LANGUAGE:</span>
            <div className="flex gap-2">
              {(['python', 'javascript'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider rounded transition-all ${
                    language === lang
                      ? 'bg-cyber text-black'
                      : 'bg-surface-300/50 border border-surface-100 text-muted hover:text-white hover:border-cyber/50'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 min-h-0 relative">
            <div className="absolute inset-0">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: 'on',
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 10,
                  automaticLayout: true,
                  renderLineHighlight: 'line',
                  cursorBlinking: 'solid',
                  cursorStyle: 'block',
                  cursorWidth: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right panel - Voice Recorder */}
        <div className="w-80 lg:w-96 flex flex-col bg-surface-300/20">
          <VoiceRecorder />

          {/* Transcription preview */}
          {transcription && (
            <div className="flex-1 border-t border-surface-100/30 overflow-auto">
              <div className="px-4 py-2 border-b border-surface-100/20 flex items-center gap-2 bg-surface-300/30">
                <Terminal size={14} className="text-neon" />
                <span className="text-xs font-mono text-neon tracking-wider">TRANSCRIPTION</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted leading-relaxed font-mono">
                  {transcription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hint modal */}
      {showHints && currentProblem.hints && (
        <HintModal
          hints={currentProblem.hints}
          onClose={() => setShowHints(false)}
        />
      )}
    </div>
  );
}
