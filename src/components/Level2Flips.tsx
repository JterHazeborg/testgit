"use client";

import { useState } from "react";
import { FLIPS } from "@/data/content";
import { useProgress } from "@/lib/progress";

type FlipState = {
  tries: number;
  /** richtig beantwortet */
  solved: boolean;
  /** abgeschlossen: richtig oder zweiter Fehlversuch */
  done: boolean;
  /** falsch angeklickte Antwort ("Fakt" = true) — für die Einfärbung */
  wrongPick: boolean | null;
};

const INITIAL: FlipState = { tries: 0, solved: false, done: false, wrongPick: null };

export default function Level2Flips({ onComplete }: { onComplete: () => void }) {
  const { addXP } = useProgress();
  const [state, setState] = useState<FlipState[]>(() => FLIPS.map(() => ({ ...INITIAL })));

  function answer(i: number, saidFakt: boolean) {
    const st = state[i];
    if (st.done) return;
    const correct = saidFakt === FLIPS[i].fakt;
    const tries = st.tries + 1;

    if (correct) addXP(tries === 1 ? 10 : 5);

    const next = state.slice();
    next[i] = {
      tries,
      solved: correct,
      done: correct || tries >= 2,
      wrongPick: correct ? st.wrongPick : saidFakt,
    };
    setState(next);
  }

  const allDone = state.every((s) => s.done);

  return (
    <section className="screen active" id="s-int-2">
      <div className="kicker">Level 2 · Irrtum oder Fakt?</div>
      <h2>Sechs Aussagen — was stimmt?</h2>
      <p className="lead">Tippen Sie bei jeder Karte auf „Fakt“ oder „Irrtum“.</p>

      <div>
        {FLIPS.map((f, i) => {
          const st = state[i];
          const cardCls = "flip" + (st.solved ? " right" : st.wrongPick !== null ? " wrong" : "");
          return (
            <div className={cardCls} key={i}>
              <div className="q">{f.q}</div>
              {[true, false].map((choice) => {
                let cls = "abtn";
                if (st.solved && choice === f.fakt) cls += " sel-right";
                if (st.wrongPick === choice) cls += " sel-wrong";
                return (
                  <button
                    key={String(choice)}
                    className={cls}
                    disabled={st.done || st.wrongPick === choice}
                    onClick={() => answer(i, choice)}
                  >
                    {choice ? "Fakt" : "Irrtum"}
                  </button>
                );
              })}
              {st.done && (
                <div className="res" style={{ display: "block" }}>
                  {f.res}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <button className="btn pulse" onClick={onComplete}>
          Level 2 abschließen (+25 XP) →
        </button>
      )}
    </section>
  );
}
