"use client";

import { useEffect, useRef } from "react";
import { debounce } from "src/utils/debounce";

export function useAutoSave<T>(
  data: T,
  onSave: (data: T) => void,
  delay = 2000
) {
  const debouncedSave = useRef(debounce(onSave, delay));

  useEffect(() => {
    if (data) {
      debouncedSave.current(data);
    }
  }, [data]);
}
