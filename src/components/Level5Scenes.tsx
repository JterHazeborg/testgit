"use client";

import { useState } from "react";
import { IMAGES, SCENES, type SceneOption } from "@/data/content";
import { useProgress } from "@/lib/progress";

export default function Level5Scenes({ onComplete }: { onComplete: () => void }) {
  const { addXP } = useProgress();
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<SceneOption | null>(null);

  const scene = SCENES[idx];
  const isLast = idx === SCENES.length - 1;

  function pick(opt: SceneOption) {
    if (answer) return;
    setAnswer(opt);
    addXP(opt.xp);
  }

  function nextScene() {
    setIdx((i) => i + 1);
    setAnswer(null);
  }

  const fbClass =
    answer && (answer.grade === "best" ? "ok" : answer.grade === "okay" ? "meh" : "bad");

  return (
    <section className="screen active" id="s-int-5">
      <div className="kicker">Level 5 · Was tun Sie?</div>
      <h2>{scene.title}</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sz-img" src={IMAGES.scenes[scene.img]} alt="Szenario-Illustration" />
      <p className="lead" style={{ marginTop: 14 }}>
        {scene.text}
      </p>

      <div>
        {scene.opts.map((o, i) => (
          <button
            key={i}
            className={"opt" + (answer === o ? " " + o.grade : "")}
            disabled={Boolean(answer)}
            onClick={() => pick(o)}
          >
            {o.t}
          </button>
        ))}
      </div>

      {answer && (
        <div className={"feedback " + fbClass}>
          {answer.fb}
          {answer.xp ? ` (+${answer.xp} XP)` : ""}
        </div>
      )}

      {answer && !isLast && (
        <button className="btn" onClick={nextScene}>
          Weiter →
        </button>
      )}
      {answer && isLast && (
        <button className="btn pulse" onClick={onComplete}>
          Level 5 abschließen (+25 XP) →
        </button>
      )}
    </section>
  );
}
