"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";

export default function Level1SelfCheck({ onComplete }: { onComplete: () => void }) {
  const { progress, addXP, setL1 } = useProgress();
  const [usage, setUsage] = useState(1);
  const [confidence, setConfidence] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  function submit() {
    if (progress.l1 === null) addXP(20);
    setL1([usage, confidence]);
    const name = progress.name ? progress.name + ", " : "";
    let txt: string;
    if (usage <= 1 && confidence <= 1)
      txt =
        name +
        "perfekt — diese Schulung holt Sie genau da ab. Alles wird von Grund auf erklärt.";
    else if (usage >= 2 && confidence >= 2)
      txt =
        name +
        "stark! Dann achten Sie besonders auf Level 3 und 4 — dort steckt, was auch Vielnutzer oft nicht wissen.";
    else
      txt =
        name +
        "gute Ausgangslage — die nächsten Level machen aus Bauchgefühl belastbares Wissen.";
    setFeedback(txt + " (+20 XP)");
  }

  return (
    <section className="screen active" id="s-int-1">
      <div className="kicker">Level 1 · Selbsteinschätzung</div>
      <h2>Wo stehen Sie heute?</h2>
      <p className="lead">Kein richtig oder falsch — Ihre Antwort personalisiert die Schulung.</p>

      <div className="card">
        <b>Wie oft nutzen Sie KI-Tools (ChatGPT, Copilot, Übersetzer …) beruflich?</b>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={usage}
          onChange={(e) => setUsage(+e.target.value)}
          style={{ marginTop: 14 }}
        />
        <div className="slider-labels">
          <span>Nie</span>
          <span>Selten</span>
          <span>Wöchentlich</span>
          <span>Täglich</span>
        </div>
      </div>

      <div className="card">
        <b>Wie sicher fühlen Sie sich im Umgang mit KI?</b>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={confidence}
          onChange={(e) => setConfidence(+e.target.value)}
          style={{ marginTop: 14 }}
        />
        <div className="slider-labels">
          <span>Unsicher</span>
          <span>Etwas</span>
          <span>Ziemlich</span>
          <span>Sehr sicher</span>
        </div>
      </div>

      <button className="btn" onClick={submit}>
        Antwort speichern
      </button>
      {feedback && <div className="feedback ok">{feedback}</div>}
      {feedback && (
        <button className="btn pulse" onClick={onComplete}>
          Level 1 abschließen (+25 XP) →
        </button>
      )}
    </section>
  );
}
