import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Zap, Activity, Settings } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME', icon: Terminal },
    { path: '/problems', label: 'PROBLEMS', icon: Zap },
    { path: '/dashboard', label: 'STATS', icon: Activity },
    { path: '/settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-void grid-bg">
      {/* Ambient glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon/5 rounded-full blur-[120px]" />
      </div>

      {/* Header - terminal style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-md border-b border-surface-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - glowing terminal prompt */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-cyber/10 border border-cyber/50 rounded flex items-center justify-center group-hover:bg-cyber/20 transition-colors">
                  <span className="text-cyber font-bold text-sm">CC</span>
                </div>
                <div className="absolute inset-0 bg-cyber/20 rounded blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  CodeCoach
                </span>
                <span className="hidden sm:block px-2 py-0.5 bg-cyber/10 border border-cyber/30 rounded text-cyber text-xs font-mono">
                  v1.0
                </span>
              </div>
            </Link>

            {/* Navigation - pill style */}
            <nav className="flex items-center gap-1 bg-surface-300/30 backdrop-blur-sm rounded-lg p-1 border border-surface-100/30">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`relative px-4 py-2 text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 rounded-md ${
                      isActive
                        ? 'text-black bg-cyber shadow-cyber'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted">
              <div className="status-dot-live" />
              <span>SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 pt-16">
        <Outlet />
      </main>

      {/* Footer - minimal terminal style */}
      <footer className="relative z-10 border-t border-surface-100/30 mt-auto bg-void/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="text-cyber">CodeCoach</span>
              <span className="text-muted">|</span>
              <span className="text-muted">Interview Practice Platform</span>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <span className="text-cyber">●</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
