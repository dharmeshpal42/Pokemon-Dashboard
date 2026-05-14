import { useRef, useEffect, useCallback } from 'react';

export function useAbortController() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const getSignal = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current.signal;
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return getSignal;
}
