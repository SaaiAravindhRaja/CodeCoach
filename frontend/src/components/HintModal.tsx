import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, AlertTriangle, ChevronRight } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

interface HintModalProps {
  hints: string[];
  onClose: () => void;
}

export function HintModal({ hints, onClose }: HintModalProps) {
  const { hintsUsed, useHint } = useSessionStore();
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
      useHint();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md mx-4 card-cyber overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-surface-100/30 bg-surface-300/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-heat/10 border border-heat/30 rounded-lg flex items-center justify-center">
                <Lightbulb size={16} className="text-heat" />
              </div>
              <span className="font-mono text-sm text-white tracking-wider">HINTS</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-surface-300/50 border border-surface-100 flex items-center justify-center text-muted hover:text-white hover:border-cyber/50 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Warning */}
          <div className="mx-4 mt-4 p-3 rounded-lg bg-heat/10 border border-heat/30 flex items-start gap-2">
            <AlertTriangle size={16} className="text-heat shrink-0 mt-0.5" />
            <p className="text-xs text-heat font-mono">
              EACH HINT USED REDUCES FINAL SCORE BY 1 POINT
            </p>
          </div>

          {/* Hints */}
          <div className="p-4 space-y-2">
            {hints.map((hint, index) => (
              <div
                key={index}
                className="border border-surface-100/30 rounded-lg overflow-hidden"
              >
                {revealedHints.includes(index) ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-surface-300/30"
                  >
                    <span className="font-mono text-xs text-cyber mb-2 block tracking-wider">
                      HINT {index + 1}
                    </span>
                    <p className="text-sm text-muted font-mono">{hint}</p>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => handleRevealHint(index)}
                    className="w-full p-4 text-left text-sm font-mono text-muted hover:text-white hover:bg-surface-300/30 transition-all flex items-center justify-between group"
                  >
                    <span className="tracking-wider">REVEAL HINT {index + 1}</span>
                    <ChevronRight size={16} className="text-muted group-hover:text-heat transition-colors" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-surface-100/30 flex items-center justify-between bg-surface-300/20">
            <span className="text-xs font-mono text-muted tracking-wider">
              USED: <span className="text-heat">{hintsUsed}</span> / {hints.length}
            </span>
            <button onClick={onClose} className="btn-primary">
              CONTINUE
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
