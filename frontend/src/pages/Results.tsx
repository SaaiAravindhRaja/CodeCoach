import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowRight, Check, AlertTriangle, Terminal, Trophy, Target, MessageSquare, Code2, Clock, Lightbulb, Sparkles } from 'lucide-react';
import { getSession } from '../services/api';
import type { Session } from '../types';

function AnimatedScore({ score, delay = 0 }: { score: number; delay?: number }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 30;
      const increment = score / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.round(current * 10) / 10);
        }
      }, duration / steps);
    }, delay);

    return () => clearTimeout(timeout);
  }, [score, delay]);

  return <>{displayScore.toFixed(1)}</>;
}

export function Results() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) return;
      try {
        const data = await getSession(parseInt(sessionId));
        setSession(data);
        if (data.evaluation && data.evaluation.overall_score >= 9) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [sessionId]);

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
          <span>LOADING RESULTS...</span>
        </div>
      </div>
    );
  }

  if (!session || !session.evaluation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="text-center">
          <p className="text-muted mb-4 font-mono">RESULTS NOT FOUND</p>
          <Link to="/problems" className="btn-secondary">
            BACK TO PROBLEMS
          </Link>
        </div>
      </div>
    );
  }

  const { evaluation } = session;

  const scoreCategories = [
    { label: 'COMMUNICATION', score: evaluation.communication_score, icon: MessageSquare, color: 'cyber' },
    { label: 'PROBLEM SOLVING', score: evaluation.problem_solving_score, icon: Target, color: 'neon' },
    { label: 'CODE QUALITY', score: evaluation.code_quality_score, icon: Code2, color: 'heat' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-neon';
    if (score >= 6) return 'text-heat';
    return 'text-danger';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return 'EXCEPTIONAL';
    if (score >= 8) return 'EXCELLENT';
    if (score >= 7) return 'GOOD';
    if (score >= 6) return 'FAIR';
    return 'NEEDS WORK';
  };

  return (
    <div className="min-h-screen py-16">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#00f0ff', '#b4ff39', '#ff6b35']}
        />
      )}

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/30 rounded-full mb-6">
            <Sparkles className="text-neon" size={14} />
            <span className="text-xs font-mono text-neon tracking-wider">EVALUATION COMPLETE</span>
          </div>
          <h1 className="font-display text-title md:text-display text-white mb-2">
            YOUR RESULTS
          </h1>
          {session.problem && (
            <p className="text-muted font-mono text-sm">{session.problem.title}</p>
          )}
        </motion.div>

        {/* Overall Score - Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-cyber p-8 mb-8 text-center relative overflow-hidden"
        >
          {/* Glow effect for high scores */}
          {evaluation.overall_score >= 8 && (
            <div className="absolute inset-0 bg-gradient-radial from-neon/10 via-transparent to-transparent" />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className={`${getScoreColor(evaluation.overall_score)}`} size={24} />
              <span className="text-xs font-mono text-muted tracking-widest">INTERVIEW READINESS</span>
            </div>

            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className={`font-display text-hero font-bold ${getScoreColor(evaluation.overall_score)} ${evaluation.overall_score >= 8 ? 'text-glow-neon' : ''}`}>
                <AnimatedScore score={evaluation.overall_score} delay={300} />
              </span>
              <span className="text-3xl text-muted font-display">/10</span>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              evaluation.overall_score >= 8
                ? 'bg-neon/10 border border-neon/30'
                : evaluation.overall_score >= 6
                ? 'bg-heat/10 border border-heat/30'
                : 'bg-danger/10 border border-danger/30'
            }`}>
              <span className={`text-sm font-mono tracking-wider ${getScoreColor(evaluation.overall_score)}`}>
                {getScoreLabel(evaluation.overall_score)}
              </span>
            </div>

            {/* Meta info */}
            <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-surface-100/30">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted mb-1">
                  <Clock size={14} />
                  <span className="text-xs font-mono tracking-wider">DURATION</span>
                </div>
                <p className="font-mono text-lg text-white">
                  {session.duration_seconds
                    ? `${Math.floor(session.duration_seconds / 60)}:${String(session.duration_seconds % 60).padStart(2, '0')}`
                    : '—'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted mb-1">
                  <Lightbulb size={14} />
                  <span className="text-xs font-mono tracking-wider">HINTS USED</span>
                </div>
                <p className="font-mono text-lg text-white">{session.hints_used}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Terminal size={16} className="text-cyber" />
            <h2 className="text-xs font-mono text-cyber tracking-widest">SCORE BREAKDOWN</h2>
          </div>

          <div className="space-y-6">
            {scoreCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={category.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-${category.color}/10 border border-${category.color}/30 flex items-center justify-center`}>
                        <Icon className={`text-${category.color}`} size={16} />
                      </div>
                      <span className="text-sm font-mono text-white tracking-wider">{category.label}</span>
                    </div>
                    <span className={`font-display text-2xl font-bold text-${category.color}`}>
                      <AnimatedScore score={category.score} delay={400 + index * 100} />
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="progress-bar ml-11">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score * 10}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`progress-bar-fill${category.color === 'cyber' ? '' : category.color === 'neon' ? '-neon' : '-heat'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} className="text-cyber" />
            <h2 className="text-xs font-mono text-cyber tracking-widest">DETAILED FEEDBACK</h2>
          </div>
          <p className="text-muted leading-relaxed whitespace-pre-line font-mono text-sm">
            {evaluation.feedback}
          </p>
        </motion.div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Strengths */}
          {evaluation.strengths && evaluation.strengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 border-neon/20 hover:border-neon/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <Check size={16} className="text-neon" />
                <h3 className="text-xs font-mono text-neon tracking-widest">STRENGTHS</h3>
              </div>
              <ul className="space-y-3">
                {evaluation.strengths.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted font-mono"
                  >
                    <span className="text-neon mt-1">+</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Improvements */}
          {evaluation.improvements && evaluation.improvements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6 border-heat/20 hover:border-heat/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} className="text-heat" />
                <h3 className="text-xs font-mono text-heat tracking-widest">AREAS TO IMPROVE</h3>
              </div>
              <ul className="space-y-3">
                {evaluation.improvements.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted font-mono"
                  >
                    <span className="text-heat mt-1">!</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/problems" className="btn-primary">
            <Terminal size={16} />
            PRACTICE ANOTHER
            <ArrowRight size={16} />
          </Link>
          <Link to="/dashboard" className="btn-secondary">
            VIEW DASHBOARD
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
