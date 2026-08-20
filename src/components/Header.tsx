"use client";

import { LEVEL_TITLES } from "@/data/content";
import { doneCount, useProgress } from "@/lib/progress";

export default function Header() {
  const { progress } = useProgress();
  const levels = [1, 2, 3, 4, 5, 6];
  const pct = Math.round((doneCount(progress) / 6) * 100);

  return (
    <>
      <header>
        <div className="logo" />
        <div className="htitle">Bibi ist der geilste!!!</div>
        <div className="badges">
          {levels.map((i) => {
            const state = progress.done[i] ? " done" : i === progress.lvl ? " now" : "";
            return (
              <div
                key={i}
                className={"badge" + state}
                title={`Level ${i}: ${LEVEL_TITLES[i]}`}
              >
                {progress.done[i] ? "✓" : i}
              </div>
            );
          })}
        </div>
        <div className="xp">{progress.xp} XP</div>
      </header>
      <div className="pbar">
        <div style={{ width: pct + "%" }} />
      </div>
    </>
  );
}
