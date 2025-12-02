import { useState, useEffect, useCallback, useRef } from "react";

interface UseTimerWithProgressOptions {
  duration: number; // длительность в секундах
  autoStart?: boolean; // автоматический запуск
  onComplete?: () => void; // callback при завершении
}

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  progress: number; // от 0 до 100
}

export function useTimerWithProgress({
  duration,
  autoStart = false,
  onComplete,
}: UseTimerWithProgressOptions): TimerState & {
  start: () => void;
  pause: () => void;
  reset: () => void;
} {
  const [isRunning, setIsRunning] = useState(autoStart);
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const progress = ((duration - timeLeft) / duration) * 100;

  // Очистка интервала
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Запуск таймера
  const start = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
  }, [timeLeft]);

  // Пауза
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Сброс
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(duration);
    clearTimerInterval();
  }, [duration, clearTimerInterval]);

  // Эффект для работы таймера
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      clearTimerInterval();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimerInterval();
  }, [isRunning, timeLeft, onComplete, clearTimerInterval]);

  return {
    isRunning,
    timeLeft,
    progress,
    start,
    pause,
    reset,
  };
}
