import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Mic, Brain, Sparkles, ChevronRight, Code2, MessageSquare, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

function TypewriterText({ texts, className }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="cursor" />
    </span>
  );
}

function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 text-cyber opacity-50 animate-pulse" style={{ transform: 'translate(-2px, 0)' }}>
        {children}
      </span>
    </span>
  );
}

// Static class mappings for Tailwind (dynamic classes don't compile)
const colorClasses = {
  cyber: {
    card: 'border-cyber/20 hover:border-cyber/50',
    iconBg: 'bg-cyber/10',
    iconBorder: 'border-cyber/30',
    text: 'text-cyber',
    shadow: 'group-hover:shadow-cyber',
    gradient: 'from-cyber/50',
  },
  heat: {
    card: 'border-heat/20 hover:border-heat/50',
    iconBg: 'bg-heat/10',
    iconBorder: 'border-heat/30',
    text: 'text-heat',
    shadow: 'group-hover:shadow-heat',
    gradient: 'from-heat/50',
  },
  neon: {
    card: 'border-neon/20 hover:border-neon/50',
    iconBg: 'bg-neon/10',
    iconBorder: 'border-neon/30',
    text: 'text-neon',
    shadow: 'group-hover:shadow-neon',
    gradient: 'from-neon/50',
  },
} as const;

type ColorKey = keyof typeof colorClasses;

export function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - MASSIVE AND IMPACTFUL */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated grid lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyber to-transparent"
                style={{ top: `${(i + 1) * 5}%`, left: 0, right: 0 }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 0.5, 0], scaleX: [0, 1, 0] }}
                transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, repeatDelay: 10 }}
              />
            ))}
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute left-0 right-0 h-32 bg-gradient-to-b from-cyber/10 via-cyber/5 to-transparent"
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text content */}
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-300/50 border border-surface-100 rounded-full mb-8"
              >
                <div className="status-dot-live" />
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  AI-Powered Interview Coach
                </span>
              </motion.div>

              {/* Main headline - MASSIVE */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-title md:text-display lg:text-hero leading-none mb-8"
              >
                <span className="text-white">EXPLAIN</span>
                <br />
                <GlitchText className="text-glow text-cyber">YOUR</GlitchText>
                <br />
                <span className="text-white">CODE</span>
              </motion.h1>

              {/* Typewriter subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="text-cyber font-mono">{'>'}</span>
                <p className="text-lg md:text-xl font-mono text-muted">
                  Practice{' '}
                  <TypewriterText
                    texts={['communication', 'problem solving', 'articulation', 'technical depth']}
                    className="text-white"
                  />
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-muted max-w-lg mb-10 leading-relaxed"
              >
                Most prep tools check if code compiles. Real interviews evaluate how
                you think and communicate. <span className="text-cyber">CodeCoach does both.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/problems" className="btn-primary group">
                  <Terminal size={18} />
                  START PRACTICING
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dashboard" className="btn-secondary">
                  VIEW STATS
                  <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* Right side - Feature preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Terminal window mockup */}
              <div className="card-cyber p-1">
                {/* Window header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-danger" />
                    <div className="w-3 h-3 rounded-full bg-heat" />
                    <div className="w-3 h-3 rounded-full bg-neon" />
                  </div>
                  <span className="flex-1 text-center text-xs font-mono text-muted">
                    codecoach_session.py
                  </span>
                </div>

                {/* Code preview */}
                <div className="p-6 font-mono text-sm space-y-2 bg-surface-300/30">
                  <div>
                    <span className="text-muted"># Your solution</span>
                  </div>
                  <div>
                    <span className="text-heat">def</span>{' '}
                    <span className="text-neon">two_sum</span>
                    <span className="text-white">(nums, target):</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-white">seen = {'{}'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-heat">for</span>{' '}
                    <span className="text-white">i, num</span>{' '}
                    <span className="text-heat">in</span>{' '}
                    <span className="text-cyber">enumerate</span>
                    <span className="text-white">(nums):</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-heat">if</span>{' '}
                    <span className="text-white">target - num</span>{' '}
                    <span className="text-heat">in</span>{' '}
                    <span className="text-white">seen:</span>
                  </div>
                  <div className="pl-12">
                    <span className="text-heat">return</span>{' '}
                    <span className="text-white">[seen[target-num], i]</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-100">
                    <Mic className="text-danger animate-pulse" size={16} />
                    <span className="text-xs text-muted">Recording explanation...</span>
                    <div className="flex-1 h-1 bg-surface-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyber"
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating score card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-4 top-1/4 card-cyber p-4 min-w-[180px]"
              >
                <div className="text-xs font-mono text-muted mb-2">EVALUATION SCORE</div>
                <div className="text-3xl font-display font-bold text-neon text-glow-neon">87</div>
                <div className="flex items-center gap-1 mt-2">
                  <Sparkles size={12} className="text-neon" />
                  <span className="text-xs text-muted">Great communication!</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works - 3 step process */}
      <section className="relative py-32 border-t border-surface-100/30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-cyber font-mono text-sm tracking-widest">PROCESS</span>
            <h2 className="font-display text-title md:text-display text-white mt-4">
              HOW IT WORKS
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              {
                icon: Code2,
                step: '01',
                title: 'WRITE CODE',
                description: 'Solve coding problems in a professional Monaco editor with Python and JavaScript support.',
                color: 'cyber' as ColorKey,
              },
              {
                icon: Mic,
                step: '02',
                title: 'EXPLAIN',
                description: 'Record yourself explaining your approach and solution, just like a real technical interview.',
                color: 'heat' as ColorKey,
              },
              {
                icon: Brain,
                step: '03',
                title: 'GET FEEDBACK',
                description: 'AI analyzes both your code AND communication, giving actionable insights to improve.',
                color: 'neon' as ColorKey,
              },
            ]).map((item, index) => {
              const classes = colorClasses[item.color];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group"
                >
                  <div className={`card p-8 h-full ${classes.card} transition-colors`}>
                    {/* Step number */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${classes.iconBg} border ${classes.iconBorder} mb-6 ${classes.shadow} transition-shadow`}>
                      <item.icon className={classes.text} size={24} />
                    </div>

                    {/* Step indicator */}
                    <div className={`font-mono ${classes.text} text-sm mb-4`}>
                      {'// '}{item.step}
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-heading text-white mb-3">{item.title}</h3>
                    <p className="text-muted leading-relaxed">{item.description}</p>

                    {/* Decorative line */}
                    <div className={`mt-6 h-px bg-gradient-to-r ${classes.gradient} to-transparent`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Evaluation categories */}
      <section className="relative py-32 border-t border-surface-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - explanation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyber font-mono text-sm tracking-widest">EVALUATION</span>
              <h2 className="font-display text-title md:text-display text-white mt-4 mb-6">
                WHAT YOU'RE
                <br />
                <span className="text-cyber text-glow">SCORED ON</span>
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Real interviewers don't just check if your code works. They evaluate
                your entire approach, from problem breakdown to final solution.
                CodeCoach mimics this holistic evaluation.
              </p>
              <Link to="/problems" className="btn-secondary inline-flex">
                TRY IT NOW
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Right - score categories */}
            <div className="space-y-4">
              {([
                {
                  icon: MessageSquare,
                  label: 'COMMUNICATION',
                  score: 92,
                  color: 'cyber' as ColorKey,
                  desc: 'Did you explain your approach clearly?'
                },
                {
                  icon: Target,
                  label: 'PROBLEM SOLVING',
                  score: 88,
                  color: 'neon' as ColorKey,
                  desc: 'Did you consider edge cases and trade-offs?'
                },
                {
                  icon: Code2,
                  label: 'CODE QUALITY',
                  score: 85,
                  color: 'heat' as ColorKey,
                  desc: 'Is it correct, efficient, and readable?'
                },
              ]).map((item, index) => {
                const classes = colorClasses[item.color];
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card p-5 group hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${classes.iconBg} border ${classes.iconBorder} flex items-center justify-center`}>
                        <item.icon className={classes.text} size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm text-white">{item.label}</span>
                          <span className={`font-display text-xl font-bold ${classes.text}`}>{item.score}</span>
                        </div>
                        <p className="text-xs text-muted">{item.desc}</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 progress-bar">
                      <motion.div
                        className={`progress-bar-fill${item.color === 'cyber' ? '' : item.color === 'neon' ? '-neon' : '-heat'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-32 border-t border-surface-100/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyber font-mono text-sm tracking-widest">READY?</span>
            <h2 className="font-display text-title md:text-display text-white mt-4 mb-6">
              START YOUR
              <br />
              <span className="text-cyber text-glow">PRACTICE SESSION</span>
            </h2>
            <p className="text-muted mb-10 max-w-md mx-auto">
              5 classic problems. Unlimited practice. AI-powered feedback on
              both your code and communication skills.
            </p>
            <Link to="/problems" className="btn-primary inline-flex">
              <Terminal size={18} />
              CHOOSE A PROBLEM
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
