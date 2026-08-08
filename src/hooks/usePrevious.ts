import { useLayoutEffect, useRef, useState } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const previousRef = useRef<T | undefined>(undefined);

  useLayoutEffect(() => {
    setPrevious(previousRef.current);
    previousRef.current = value;
  }, [value]);

  return previous;
}
