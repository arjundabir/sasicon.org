"use client";
import { useState, useEffect, useCallback } from "react";

const IS_SERVER = typeof window === 'undefined';

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    if (IS_SERVER) return initialValue;

    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!IS_SERVER) {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [key, state]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(state) : value;
    setState(valueToStore);
  }, [state]);

  return [state, setValue] as const;
};

export default useLocalStorage;