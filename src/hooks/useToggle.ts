import { useState } from "react";

interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
}

export function useToggle(
  initialValue: boolean = false
): UseToggleReturn {

  const [value, setValue] =
    useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue(
      (prev: boolean) => !prev
    );
  };

  return {
    value,
    toggle,
  };
}