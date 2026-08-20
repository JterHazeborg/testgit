"use client";

import { useEffect, useRef, useState } from "react";
import { LEVEL_TITLES, VIDEOS } from "@/data/content";

type Props = {
  level: number;
  onNext: () => void;
};

export default function VideoScreen({ level, onNext }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setEnded(false);
    const el = ref.current;
    if (!el) return;
    el.currentTime = 0;
    // Autoplay kann vom Browser blockiert werden — dann startet die Nutzerin manuell.
    void el.play().catch(() => {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [level]);

  function next() {
    ref.current?.pause();
    onNext();
  }

  return (
    <section className="screen active" id="s-video">
      <div className="kicker">Level {level}</div>
      <h2>{LEVEL_TITLES[level]}</h2>
      <video
        ref={ref}
        key={level}
        src={VIDEOS[level]}
        controls
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
      />
      <p className="hint">🔊 Ton an! Sie können das Video jederzeit überspringen.</p>
      <div className="row">
        <button className={"btn" + (ended ? " pulse" : "")} onClick={next}>
          Weiter zur Aufgabe →
        </button>
        <button className="btn ghost" onClick={next}>
          Überspringen
        </button>
      </div>
    </section>
  );
}
