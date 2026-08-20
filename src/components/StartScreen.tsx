"use client";

import { useEffect, useState } from "react";
import { IMAGES } from "@/data/content";
import { useProgress } from "@/lib/progress";

type Props = {
  onStart: (name: string) => void;
  onResume: () => void;
};

export default function StartScreen({ onStart, onResume }: Props) {
  const { progress, hydrated, reset } = useProgress();
  const [name, setName] = useState("");

  useEffect(() => {
    if (hydrated && progress.name) setName(progress.name);
  }, [hydrated, progress.name]);

  const started = progress.lvl > 1 || progress.l1 !== null;

  function handleReset() {
    if (!window.confirm("Wirklich alles zurücksetzen? Ihr Fortschritt geht verloren.")) return;
    reset();
    setName("");
  }

  return (
    <section className="screen active" id="s-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero" src={IMAGES.hero} alt="Lumen — Ihr Lernbegleiter" />
      <h1 style={{ marginTop: 22 }}>
        Willkommen zur Schulung
        <br />
        „KI-Kompetenz im Arbeitsalltag“
      </h1>
      <p className="lead">
        Sechs Level, rund 25 Minuten: Sie lernen, wie KI wirklich funktioniert, welche Daten
        geschützt bleiben müssen, was die EU-KI-Verordnung von uns verlangt — und wie Sie KI souverän
        und sicher einsetzen. Ihr Begleiter: <b style={{ color: "var(--teal)" }}>Lumen</b>. 🔊{" "}
        <b>Bitte Ton einschalten!</b>
      </p>
      <div className="card no-print">
        <label htmlFor="uname" style={{ fontSize: 14.5, color: "var(--muted)" }}>
          Ihr Name (optional, nur für persönliches Feedback):
        </label>
        <br />
        <input
          id="uname"
          type="text"
          maxLength={40}
          placeholder="z. B. Alex"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginTop: 8,
            background: "var(--bg)",
            border: "1px solid var(--line)",
            color: "var(--text)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 15,
            width: "min(320px,100%)",
          }}
        />
      </div>
      <div className="row">
        <button className="btn" onClick={() => onStart(name.trim())}>
          {started ? "Von vorn beginnen" : "Schulung starten"}
        </button>
        {started && (
          <>
            <button className="btn ghost" onClick={onResume}>
              Fortsetzen
            </button>
            <button className="btn ghost no-print" onClick={handleReset}>
              Zurücksetzen
            </button>
          </>
        )}
      </div>
      <p className="hint">
        Hinweis nach Art. 4 KI-VO: Diese Schulung ist Teil der KI-Kompetenz-Maßnahmen unseres
        Unternehmens. Rechtsstand: 1. August 2026 (inkl. Digital-Omnibus-Verordnung (EU) 2026/1744).
      </p>
    </section>
  );
}
