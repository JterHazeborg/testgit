"use client";

import { MERKSAETZE } from "@/data/content";
import { useProgress } from "@/lib/progress";

type Props = {
  onRetryCheck: () => void;
  onReset: () => void;
};

export default function SummaryScreen({ onRetryCheck, onReset }: Props) {
  const { progress, reset } = useProgress();

  function handleReset() {
    if (!window.confirm("Wirklich alles zurücksetzen? Ihr Fortschritt geht verloren.")) return;
    reset();
    onReset();
  }

  return (
    <section className="screen active" id="s-summary">
      <div className="kicker">Geschafft!</div>
      <h1>
        {progress.name
          ? `${progress.name}, Sie haben die Schulung abgeschlossen 🎉`
          : "Sie haben die Schulung abgeschlossen 🎉"}
      </h1>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <div className="bigxp">{progress.xp} XP</div>
            <div className="hint">gesammelte Erfahrungspunkte</div>
          </div>
          <div>
            <div className="bigxp">
              {progress.checkBest >= 0 ? `${progress.checkBest}/9` : "–"}
            </div>
            <div className="hint">Abschluss-Check</div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: 26 }}>Ihr Merkblatt — die 6 Kernsätze</h2>
      {MERKSAETZE.map((satz, i) => (
        <div className="merk" key={i}>
          <b>{i + 1}.</b> {satz}
        </div>
      ))}

      <p className="hint">
        Rechtsstand 01.08.2026 · Art. 4 KI-VO (VO (EU) 2024/1689) i. d. F. der Digital-Omnibus-VO
        (EU) 2026/1744.
      </p>

      <div className="row no-print">
        <button className="btn" onClick={() => window.print()}>
          🖨️ Merkblatt drucken
        </button>
        <button className="btn ghost" onClick={onRetryCheck}>
          Check wiederholen
        </button>
        <button className="btn ghost" onClick={handleReset}>
          Schulung zurücksetzen
        </button>
      </div>
    </section>
  );
}
