import { useRef } from "react";

type DebounceFunction<T extends unknown[]> = (...args: T) => void;

export function useDebounce<T extends unknown[]>(func: DebounceFunction<T>, delayTime: number): DebounceFunction<T> {
  const timerRef = useRef<NodeJS.Timeout | undefined>();

  return (...args: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      func(...args);
    }, delayTime);
  };
}