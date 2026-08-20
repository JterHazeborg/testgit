"use client";

import { useState, type DragEvent } from "react";
import { DD, DD_CATS, type RiskCat } from "@/data/content";
import { useProgress } from "@/lib/progress";

type Feedback = { kind: "ok" | "bad"; text: string } | null;

export default function Level4Risk({ onComplete }: { onComplete: () => void }) {
  const { addXP } = useProgress();
  const [placed, setPlaced] = useState<Record<number, RiskCat>>({});
  const [selected, setSelected] = useState<number>(-1);
  const [tries, setTries] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [hotCat, setHotCat] = useState<RiskCat | null>(null);

  function select(i: number) {
    if (placed[i]) return;
    setSelected(i);
  }

  function drop(cat: RiskCat, itemIdx: number) {
    if (itemIdx < 0 || placed[itemIdx]) return;
    const item = DD[itemIdx];
    const t = (tries[itemIdx] || 0) + 1;
    setTries((prev) => ({ ...prev, [itemIdx]: t }));

    if (cat === item.cat) {
      setPlaced((prev) => ({ ...prev, [itemIdx]: cat }));
      setSelected(-1);
      addXP(t === 1 ? 10 : 5);
      setFeedback({ kind: "ok", text: "Richtig! " + item.why });
    } else {
      setFeedback({
        kind: "bad",
        text: "Das passt nicht — überlegen Sie: Wie stark greift diese Anwendung in Rechte von Menschen ein?",
      });
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>, cat: RiskCat) {
    e.preventDefault();
    setHotCat(null);
    const idx = Number(e.dataTransfer.getData("text/plain"));
    drop(cat, Number.isNaN(idx) ? selected : idx);
  }

  const allPlaced = Object.keys(placed).length === DD.length;

  return (
    <section className="screen active" id="s-int-4">
      <div className="kicker">Level 4 · Risikoklassen</div>
      <h2>Ordnen Sie die sechs Anwendungen zu</h2>
      <p className="lead">
        Erst Anwendung antippen, dann die passende Risikoklasse — oder per Drag &amp; Drop ziehen.
      </p>

      <div>
        {DD.map((d, i) => {
          const isPlaced = Boolean(placed[i]);
          const cls = "dd-item" + (isPlaced ? " placed" : selected === i ? " sel" : "");
          return (
            <div
              key={i}
              className={cls}
              draggable={!isPlaced}
              onClick={() => select(i)}
              onDragStart={(e) => {
                select(i);
                e.dataTransfer.setData("text/plain", String(i));
              }}
            >
              {d.t}
            </div>
          );
        })}
      </div>

      <div className="dd-cats">
        {DD_CATS.map(({ cat, label, cls }) => (
          <div
            key={cat}
            className={"dd-cat " + cls + (hotCat === cat ? " hot" : "")}
            onClick={() => drop(cat, selected)}
            onDragOver={(e) => {
              e.preventDefault();
              setHotCat(cat);
            }}
            onDragLeave={() => setHotCat(null)}
            onDrop={(e) => onDrop(e, cat)}
          >
            <h4>{label}</h4>
            <div className="slots">
              {DD.map((d, i) =>
                placed[i] === cat ? (
                  <div className="slot" key={i}>
                    ✓ {d.t}
                  </div>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      {feedback && <div className={"feedback " + feedback.kind}>{feedback.text}</div>}

      {allPlaced && (
        <button className="btn pulse" onClick={onComplete}>
          Level 4 abschließen (+25 XP) →
        </button>
      )}
    </section>
  );
}
