import { useEffect, useRef, useState } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const [previousValue, setPreviousValue] = useState<T | undefined>(undefined);
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    setPreviousValue(ref.current);
    ref.current = value;
  }, [value]);

  return previousValue;
}