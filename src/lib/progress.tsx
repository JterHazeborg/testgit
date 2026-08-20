"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const KEY = "ki-schulung-art4-v1";

export type Progress = {
  xp: number;
  name: string;
  lvl: number;
  done: Record<number, boolean>;
  l1: [number, number] | null;
  checkBest: number;
};

const EMPTY: Progress = { xp: 0, name: "", lvl: 1, done: {}, l1: null, checkBest: -1 };

function read(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    return { ...EMPTY };
  }
}

type Ctx = {
  /** Fortschritt. Vor der Hydration immer der Leerzustand — siehe `hydrated`. */
  progress: Progress;
  /** false, solange localStorage noch nicht gelesen wurde (Server/erstes Render). */
  hydrated: boolean;
  setName: (name: string) => void;
  addXP: (n: number) => void;
  setL1: (values: [number, number]) => void;
  completeLevel: (n: number) => void;
  recordCheck: (score: number) => void;
  reset: () => void;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(read());
    setHydrated(true);
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* z. B. Private Mode ohne Storage — Fortschritt bleibt dann nur im Speicher */
      }
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      progress,
      hydrated,
      setName: (name) => update((p) => ({ ...p, name })),
      addXP: (n) => update((p) => ({ ...p, xp: Math.max(0, p.xp + n) })),
      setL1: (values) => update((p) => ({ ...p, l1: values })),
      completeLevel: (n) =>
        update((p) => ({
          ...p,
          done: { ...p.done, [n]: true },
          xp: p.done[n] ? p.xp : p.xp + 25,
          lvl: Math.max(p.lvl, n + 1),
        })),
      recordCheck: (score) =>
        update((p) => (score > p.checkBest ? { ...p, checkBest: score } : p)),
      reset: () => {
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          /* ignorieren */
        }
        setProgress({ ...EMPTY });
      },
    }),
    [progress, hydrated, update],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress muss innerhalb von <ProgressProvider> genutzt werden");
  return ctx;
}

export const doneCount = (p: Progress) => Object.values(p.done).filter(Boolean).length;
