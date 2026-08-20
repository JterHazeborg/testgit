"use client";

import { useEffect, useRef, useState } from "react";
import { IMAGES, QUESTIONS } from "@/data/content";
import { useProgress } from "@/lib/progress";

const PASS_MARK = 7;

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Answered = { picked: string; correct: boolean };

type Props = {
  /** Zur Zusammenfassung (nur nach bestandenem Check) */
  onFinish: () => void;
  /** Check neu aufbauen */
  onRetry: () => void;
};

export default function Level6Check({ onFinish, onRetry }: Props) {
  const { addXP, recordCheck } = useProgress();
  // Die Reihenfolge wird einmal pro Durchlauf gewürfelt; die Komponente rendert
  // ausschließlich im Browser, daher ist Math.random hier unkritisch.
  const [order] = useState(() =>
    shuffle(QUESTIONS.map((_, i) => i)).map((qi) => ({
      qi,
      opts: shuffle(QUESTIONS[qi].a),
    })),
  );
  const [answers, setAnswers] = useState<Record<number, Answered>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = Object.keys(answers).length;
  const finished = answeredCount === QUESTIONS.length;
  const score = Object.values(answers).filter((a) => a.correct).length;
  const passed = score >= PASS_MARK;
  const wrongTopics = [
    ...new Set(
      Object.entries(answers)
        .filter(([, a]) => !a.correct)
        .map(([qi]) => QUESTIONS[Number(qi)].topic),
    ),
  ];

  useEffect(() => {
    if (!finished) return;
    recordCheck(score);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
    // recordCheck ist stabil genug; bewusst nur beim Abschluss ausführen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function pick(qi: number, opt: string) {
    if (answers[qi]) return;
    const correct = opt === QUESTIONS[qi].a[0];
    if (correct) addXP(10);
    setAnswers((prev) => ({ ...prev, [qi]: { picked: opt, correct } }));
  }

  return (
    <section className="screen active" id="s-check">
      <div className="kicker">Level 6 · Abschluss-Check</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sz-img" src={IMAGES.final} alt="Abschluss" />
      <h2 style={{ marginTop: 14 }}>9 Fragen — zeigen Sie, was hängen geblieben ist</h2>
      <p className="lead">
        Ab {PASS_MARK} richtigen Antworten ist der Check bestanden. Sie können ihn wiederholen.
      </p>

      <div>
        {order.map(({ qi, opts }, num) => {
          const q = QUESTIONS[qi];
          const given = answers[qi];
          return (
            <div key={qi}>
              <div className="qnum">Frage {num + 1} von {QUESTIONS.length}</div>
              <div className="qtext">{q.q}</div>
              {opts.map((opt) => {
                let cls = "opt";
                if (given) {
                  if (opt === q.a[0]) cls += " best";
                  else if (opt === given.picked) cls += " risky";
                }
                return (
                  <button
                    key={opt}
                    className={cls}
                    disabled={Boolean(given)}
                    onClick={() => pick(qi, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {finished && (
        <div className="card" ref={resultRef}>
          <h2>{passed ? "Bestanden! 🎉" : "Noch nicht ganz …"}</h2>
          <p className="lead">
            {score} von {QUESTIONS.length} richtig
            {passed ? "" : ` — ab ${PASS_MARK} ist der Check bestanden`}.
          </p>
          {wrongTopics.length > 0 && (
            <div className="result-hints">
              <b>Schauen Sie sich noch einmal an:</b>
              <br />
              {wrongTopics.map((t) => (
                <span key={t}>
                  · {t}
                  <br />
                </span>
              ))}
            </div>
          )}
          <div className="row no-print" style={{ marginTop: 14 }}>
            {passed && (
              <button className="btn pulse" onClick={onFinish}>
                Zur Zusammenfassung →
              </button>
            )}
            <button className="btn ghost" onClick={onRetry}>
              Check wiederholen
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
