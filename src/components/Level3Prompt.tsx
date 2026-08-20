"use client";

import { useEffect, useState } from "react";
import { TOKENS } from "@/data/content";
import { useProgress } from "@/lib/progress";

export default function Level3Prompt({ onComplete }: { onComplete: () => void }) {
  const { addXP } = useProgress();
  const [found, setFound] = useState<number[]>([]);
  /** Zähler pro Token, um die Shake-Animation bei jedem Fehlklick neu zu starten */
  const [shakes, setShakes] = useState<number[]>(() => TOKENS.map(() => 0));
  const [showMissHint, setShowMissHint] = useState(false);

  useEffect(() => {
    if (!showMissHint) return;
    const t = window.setTimeout(() => setShowMissHint(false), 3500);
    return () => window.clearTimeout(t);
  }, [showMissHint]);

  function clickTok(i: number) {
    const tok = TOKENS[i];
    if (found.includes(i)) return;
    if (tok.err) {
      setFound((f) => [...f, i]);
      addXP(10);
    } else {
      setShakes((s) => s.map((n, idx) => (idx === i ? n + 1 : n)));
      addXP(-5);
      setShowMissHint(true);
    }
  }

  const complete = found.length === 4;

  return (
    <section className="screen active" id="s-int-3">
      <div className="kicker">Level 3 · Finde die 4 Fehler</div>
      <h2>Dieser Prompt soll gleich abgeschickt werden …</h2>
      <p className="lead">
        Klicken Sie die <b>vier Stellen</b> an, die niemals in ein öffentliches KI-Tool gehören.
        Vorsicht: Fehlklicks kosten 5 XP.
      </p>

      <div className="prompt-box">
        „
        {TOKENS.map((tok, i) => {
          const hit = found.includes(i);
          return (
            <span
              key={`${i}-${shakes[i]}`}
              className={"tok" + (hit ? " hit" : shakes[i] > 0 ? " miss" : "")}
              onClick={() => clickTok(i)}
            >
              {tok.t}
            </span>
          );
        })}
        “
      </div>

      <div className="found-list">
        {found.map((tokIdx, n) => (
          <div key={tokIdx}>
            <b>Fehler {n + 1}:</b> {TOKENS[tokIdx].why} (+10 XP)
          </div>
        ))}
        {showMissHint && (
          <div style={{ color: "var(--amber)" }}>
            Diese Stelle ist unkritisch. (−5 XP) Suchen Sie nach Personendaten, Zahlen, Interna und
            Passwörtern.
          </div>
        )}
      </div>

      {complete && (
        <div className="clean-box" style={{ display: "block" }}>
          „Schreibe eine freundliche Zahlungserinnerung an{" "}
          <b style={{ color: "var(--teal)" }}>unseren Kunden [Name]</b>. Es geht um eine{" "}
          <b style={{ color: "var(--teal)" }}>offene Rechnung aus einem Projekt</b>. Bitte höflich,
          aber mit klarer Frist zum Monatsende.“ ✓ So geht es datensicher.
        </div>
      )}

      {complete && (
        <button className="btn pulse" onClick={onComplete}>
          Level 3 abschließen (+25 XP) →
        </button>
      )}
    </section>
  );
}
