import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import { ArrowRight, Terminal, Activity, Trophy, Flame, Clock, Target, MessageSquare, Code2, TrendingUp } from 'lucide-react';
import { getDashboardStats } from '../services/api';
import type { DashboardStats } from '../types';

function StatCard({ icon: Icon, label, value, subValue, color = 'cyber' }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 group hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg bg-${color}/10 border border-${color}/30 flex items-center justify-center`}>
          <Icon className={`text-${color}`} size={18} />
        </div>
      </div>
      <p className="text-xs font-mono text-muted tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`font-display text-3xl font-bold text-${color}`}>{value}</span>
        {subValue && <span className="text-sm text-muted">{subValue}</span>}
      </div>
    </motion.div>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

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
          <span>LOADING STATS...</span>
        </div>
      </div>
    );
  }

  if (!stats || stats.total_sessions === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyber/10 border border-cyber/30 rounded-full mb-6">
            <Activity className="text-cyber" size={14} />
            <span className="text-xs font-mono text-cyber tracking-wider">DASHBOARD</span>
          </div>
          <h1 className="font-display text-title md:text-display text-white mb-4">
            NO DATA YET
          </h1>
          <p className="text-muted mb-8 font-mono">
            Complete a practice session to see your progress analytics.
          </p>
          <Link to="/problems" className="btn-primary">
            <Terminal size={16} />
            START PRACTICING
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const lineData = stats.score_history.map((item, index) => ({
    session: index + 1,
    score: item.overall,
    communication: item.communication,
    problem_solving: item.problem_solving,
    code_quality: item.code_quality,
  }));

  const radarData = [
    { skill: 'Communication', value: stats.skill_breakdown.communication, fullMark: 10 },
    { skill: 'Problem Solving', value: stats.skill_breakdown.problem_solving, fullMark: 10 },
    { skill: 'Code Quality', value: stats.skill_breakdown.code_quality, fullMark: 10 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-neon';
    if (score >= 6) return 'text-heat';
    return 'text-danger';
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyber/10 border border-cyber/30 rounded-lg flex items-center justify-center">
              <Activity className="text-cyber" size={20} />
            </div>
            <div>
              <span className="text-cyber font-mono text-xs tracking-widest">ANALYTICS</span>
              <h1 className="font-display text-title text-white">
                DASHBOARD
              </h1>
            </div>
          </div>
          <p className="text-muted max-w-lg">
            Track your interview preparation progress and identify areas for improvement.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={TrendingUp}
            label="AVG SCORE"
            value={stats.average_score.toFixed(1)}
            subValue="/10"
            color={stats.average_score >= 8 ? 'neon' : stats.average_score >= 6 ? 'heat' : 'danger'}
          />
          <StatCard
            icon={Terminal}
            label="SESSIONS"
            value={stats.total_sessions}
            color="cyber"
          />
          <StatCard
            icon={Flame}
            label="STREAK"
            value={stats.streak_days}
            subValue="days"
            color="heat"
          />
          <StatCard
            icon={Trophy}
            label="BADGES"
            value={stats.badges.length}
            color="neon"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Score Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-cyber" />
              <h2 className="text-xs font-mono text-cyber tracking-widest">SCORE TREND</h2>
            </div>
            {lineData.length > 1 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <XAxis
                      dataKey="session"
                      stroke="#525252"
                      tick={{ fill: '#525252', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={[0, 10]}
                      stroke="#525252"
                      tick={{ fill: '#525252', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                      width={24}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111111',
                        border: '1px solid #171717',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono',
                      }}
                      labelStyle={{ color: '#525252' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Overall"
                      stroke="#00f0ff"
                      strokeWidth={2}
                      dot={{ fill: '#00f0ff', strokeWidth: 0, r: 3 }}
                      activeDot={{ fill: '#00f0ff', strokeWidth: 0, r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="communication"
                      name="Communication"
                      stroke="#00f0ff"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="problem_solving"
                      name="Problem Solving"
                      stroke="#b4ff39"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="code_quality"
                      name="Code Quality"
                      stroke="#ff6b35"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted font-mono text-sm">
                COMPLETE MORE SESSIONS TO SEE TRENDS
              </div>
            )}
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Target size={16} className="text-neon" />
              <h2 className="text-xs font-mono text-neon tracking-widest">SKILL RADAR</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#171717" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: '#525252', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#00f0ff"
                    fill="#00f0ff"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Skill Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Terminal size={16} className="text-cyber" />
            <h2 className="text-xs font-mono text-cyber tracking-widest">SKILL BREAKDOWN</h2>
          </div>
          <div className="space-y-6">
            {[
              { key: 'communication', label: 'COMMUNICATION', icon: MessageSquare, color: 'cyber' },
              { key: 'problem_solving', label: 'PROBLEM SOLVING', icon: Target, color: 'neon' },
              { key: 'code_quality', label: 'CODE QUALITY', icon: Code2, color: 'heat' },
            ].map((skill) => {
              const value = stats.skill_breakdown[skill.key as keyof typeof stats.skill_breakdown];
              const Icon = skill.icon;
              return (
                <div key={skill.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-${skill.color}/10 border border-${skill.color}/30 flex items-center justify-center`}>
                        <Icon className={`text-${skill.color}`} size={16} />
                      </div>
                      <span className="text-sm font-mono text-white tracking-wider">{skill.label}</span>
                    </div>
                    <span className={`font-display text-xl font-bold text-${skill.color}`}>
                      {value.toFixed(1)}
                    </span>
                  </div>
                  <div className="progress-bar ml-11">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 10}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={`progress-bar-fill${skill.color === 'cyber' ? '' : skill.color === 'neon' ? '-neon' : '-heat'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyber" />
              <h2 className="text-xs font-mono text-cyber tracking-widest">RECENT SESSIONS</h2>
            </div>
            <Link to="/problems" className="btn-ghost text-xs">
              PRACTICE MORE
              <ArrowRight size={14} />
            </Link>
          </div>

          {stats.recent_sessions.length > 0 ? (
            <div className="space-y-2">
              {stats.recent_sessions.slice(0, 5).map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <Link
                    to={`/results/${session.id}`}
                    className="flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-surface-300/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-300/50 border border-surface-100 flex items-center justify-center group-hover:border-cyber/50 transition-colors">
                        <span className="font-mono text-sm text-muted group-hover:text-cyber transition-colors">
                          #{session.id}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-mono text-sm group-hover:text-cyber transition-colors">
                          {session.problem?.title || `Session #${session.id}`}
                        </p>
                        <p className="text-xs text-muted font-mono">
                          {session.completed_at
                            ? new Date(session.completed_at).toLocaleDateString()
                            : 'In progress'}
                        </p>
                      </div>
                    </div>
                    {session.evaluation && (
                      <div className="flex items-center gap-3">
                        <span className={`font-display text-2xl font-bold ${getScoreColor(session.evaluation.overall_score)}`}>
                          {session.evaluation.overall_score}
                        </span>
                        <ArrowRight size={16} className="text-muted group-hover:text-cyber transition-colors" />
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-8 font-mono text-sm">
              NO SESSIONS YET
            </p>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link to="/problems" className="btn-primary">
            <Terminal size={16} />
            START NEW SESSION
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
