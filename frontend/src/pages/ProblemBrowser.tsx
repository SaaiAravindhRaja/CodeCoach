import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Clock, Zap, Flame, Skull, Filter, Code2 } from 'lucide-react';
import { getProblems } from '../services/api';
import type { Problem } from '../types';

export function ProblemBrowser() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchProblems() {
      try {
        const data = await getProblems();
        setProblems(data);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((problem) => {
    return filter === 'all' || problem.difficulty === filter;
  });

  const difficultyConfig = {
    easy: { class: 'badge-easy', icon: Zap, label: 'EASY' },
    medium: { class: 'badge-medium', icon: Flame, label: 'MEDIUM' },
    hard: { class: 'badge-hard', icon: Skull, label: 'HARD' },
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyber/10 border border-cyber/30 rounded-lg flex items-center justify-center">
              <Code2 className="text-cyber" size={20} />
            </div>
            <div>
              <span className="text-cyber font-mono text-xs tracking-widest">SELECT CHALLENGE</span>
              <h1 className="font-display text-title text-white">
                PROBLEMS
              </h1>
            </div>
          </div>
          <p className="text-muted max-w-lg">
            Choose a problem to start your practice session. Write code, explain your approach, get AI feedback.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8 pb-8 border-b border-surface-100/30"
        >
          <Filter size={16} className="text-muted" />
          <span className="text-xs font-mono text-muted uppercase tracking-wider">Filter:</span>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'ALL', color: 'cyber' },
              { key: 'easy', label: 'EASY', color: 'neon' },
              { key: 'medium', label: 'MEDIUM', color: 'heat' },
              { key: 'hard', label: 'HARD', color: 'danger' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-4 py-2 text-xs font-mono tracking-wider rounded-md transition-all ${
                  filter === item.key
                    ? item.key === 'all'
                      ? 'bg-cyber text-black'
                      : item.key === 'easy'
                      ? 'bg-neon text-black'
                      : item.key === 'medium'
                      ? 'bg-heat text-black'
                      : 'bg-danger text-black'
                    : 'text-muted hover:text-white border border-surface-100 hover:border-surface-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="ml-auto text-xs font-mono text-muted">
            {filteredProblems.length} PROBLEMS
          </div>
        </motion.div>

        {/* Problems grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-flex items-center gap-3 text-muted">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Terminal size={20} />
              </motion.div>
              <span className="font-mono text-sm">LOADING PROBLEMS...</span>
            </div>
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="py-20 text-center text-muted font-mono">
            NO PROBLEMS FOUND
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProblems.map((problem, index) => {
              const config = difficultyConfig[problem.difficulty];
              const DiffIcon = config.icon;

              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={`/practice/${problem.id}`}
                    className="group block card p-6 hover:border-cyber/50 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      {/* Problem number */}
                      <div className="hidden sm:flex w-16 h-16 bg-surface-300/50 border border-surface-100 rounded-lg items-center justify-center group-hover:border-cyber/50 group-hover:bg-cyber/5 transition-all">
                        <span className="font-display text-2xl text-muted group-hover:text-cyber transition-colors">
                          {String(problem.id).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Title */}
                          <h3 className="font-display text-lg text-white group-hover:text-cyber transition-colors truncate">
                            {problem.title}
                          </h3>
                          {/* Difficulty badge */}
                          <span className={config.class}>
                            <DiffIcon size={12} />
                            {config.label}
                          </span>
                        </div>

                        {/* Description preview */}
                        <p className="text-sm text-muted line-clamp-1 mb-3">
                          {problem.description?.split('\n')[0] || 'No description available'}
                        </p>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs font-mono text-muted">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            ~15 MIN
                          </span>
                          <span className="flex items-center gap-1">
                            <Terminal size={12} />
                            PYTHON / JS
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-2">
                        <span className="hidden md:block text-xs font-mono text-muted group-hover:text-cyber transition-colors">
                          START
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-surface-300/50 border border-surface-100 flex items-center justify-center group-hover:bg-cyber group-hover:border-cyber transition-all">
                          <ArrowRight className="text-muted group-hover:text-black group-hover:translate-x-0.5 transition-all" size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-surface-100/30"
        >
          <div className="card-cyber p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyber/10 border border-cyber/30 rounded-lg flex items-center justify-center shrink-0">
                <Terminal className="text-cyber" size={18} />
              </div>
              <div>
                <h3 className="font-mono text-sm text-cyber mb-2 tracking-wider">
                  HOW IT WORKS
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Each session gives you a code editor and voice recorder.
                  Write your solution while explaining your thinking out loud.
                  When you submit, our AI evaluates both your <span className="text-white">code quality</span> and{' '}
                  <span className="text-white">communication clarity</span>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
