import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Check, AlertTriangle } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

export function VoiceRecorder() {
  const {
    isRecording,
    recordingTime,
    audioBlob,
    setIsRecording,
    setRecordingTime,
    setAudioBlob,
  } = useSessionStore();

  const [permissionDenied, setPermissionDenied] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const updateLevel = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255);
        animationRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setAudioLevel(0);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);

      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = window.setInterval(() => {
        setRecordingTime(recordingTime + 1);
      }, 1000);

    } catch (error) {
      console.error('Failed to start recording:', error);
      setPermissionDenied(true);
    }
  }, [setIsRecording, setRecordingTime, setAudioBlob, recordingTime]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
  }, [setIsRecording]);

  useEffect(() => {
    if (isRecording && timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(recordingTime + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, recordingTime, setRecordingTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 border-b border-surface-100/30">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Mic size={14} className={isRecording ? 'text-danger animate-pulse' : 'text-cyber'} />
        <span className="text-xs font-mono text-cyber tracking-widest">
          {isRecording ? 'RECORDING' : 'VOICE RECORDER'}
        </span>
      </div>

      {permissionDenied && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 flex items-start gap-2">
          <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
          <p className="text-xs text-danger font-mono">
            MICROPHONE ACCESS DENIED. ENABLE IN BROWSER SETTINGS.
          </p>
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* Waveform visualization - cyber style */}
        <div className="w-full h-20 flex items-center justify-center gap-0.5 mb-6 bg-surface-300/20 rounded-lg border border-surface-100/30 px-4">
          {isRecording ? (
            Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-cyber to-neon"
                animate={{
                  height: `${8 + audioLevel * 56 * Math.sin((i / 40) * Math.PI)}px`,
                }}
                transition={{ duration: 0.05 }}
              />
            ))
          ) : audioBlob ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
                <Check size={16} className="text-neon" />
              </div>
              <span className="text-xs font-mono text-neon tracking-wider">RECORDING SAVED</span>
            </div>
          ) : (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-2 bg-surface-100 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Timer */}
        <div className={`font-mono text-3xl mb-6 tabular-nums ${isRecording ? 'text-danger' : 'text-white'}`}>
          {formatTime(recordingTime)}
        </div>

        {/* Record button - cyber style */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isRecording
              ? 'bg-danger shadow-heat'
              : 'bg-surface-300/50 border-2 border-surface-100 hover:border-cyber/50 hover:bg-cyber/10'
          }`}
        >
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-danger"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {isRecording ? (
            <Square className="w-6 h-6 text-white fill-white" />
          ) : (
            <Mic className="w-6 h-6 text-muted" />
          )}
        </button>

        <p className="text-xs font-mono text-muted mt-4 tracking-wider">
          {isRecording ? 'CLICK TO STOP' : 'CLICK TO RECORD'}
        </p>
      </div>

      {/* Tips */}
      <div className="mt-6 pt-6 border-t border-surface-100/30">
        <p className="text-xs font-mono text-muted tracking-wider mb-3">TIPS</p>
        <ul className="text-xs text-muted space-y-2 font-mono">
          <li className="flex items-start gap-2">
            <span className="text-cyber">{'>'}</span>
            Explain approach before coding
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyber">{'>'}</span>
            Think aloud as you write
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyber">{'>'}</span>
            Mention edge cases
          </li>
        </ul>
      </div>
    </div>
  );
}
