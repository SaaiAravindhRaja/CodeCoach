import { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

export function Timer() {
  const { elapsedSeconds, updateElapsedTime, startTime } = useSessionStore();

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      updateElapsedTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, updateElapsedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Color based on time urgency
  const getTimeStyle = () => {
    if (elapsedSeconds < 15 * 60) {
      return {
        text: 'text-cyber',
        bg: 'bg-cyber/10',
        border: 'border-cyber/30',
      };
    }
    if (elapsedSeconds < 30 * 60) {
      return {
        text: 'text-heat',
        bg: 'bg-heat/10',
        border: 'border-heat/30',
      };
    }
    return {
      text: 'text-danger',
      bg: 'bg-danger/10',
      border: 'border-danger/30',
    };
  };

  const style = getTimeStyle();

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${style.bg} border ${style.border}`}>
      <Clock size={14} className={style.text} />
      <span className={`font-mono text-sm tabular-nums ${style.text} tracking-wider`}>
        {formatTime(elapsedSeconds)}
      </span>
    </div>
  );
}
