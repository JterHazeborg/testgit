"use client";

import { useEffect, useState } from "react";
import StartScreen from "@/components/StartScreen";
import VideoScreen from "@/components/VideoScreen";
import Level1SelfCheck from "@/components/Level1SelfCheck";
import Level2Flips from "@/components/Level2Flips";
import Level3Prompt from "@/components/Level3Prompt";
import Level4Risk from "@/components/Level4Risk";
import Level5Scenes from "@/components/Level5Scenes";
import Level6Check from "@/components/Level6Check";
import SummaryScreen from "@/components/SummaryScreen";
import { doneCount, useProgress } from "@/lib/progress";

type Screen = "start" | "video" | "interaction" | "check" | "summary";

export default function Page() {
  const { progress, hydrated, setName, completeLevel } = useProgress();
  const [screen, setScreen] = useState<Screen>("start");
  const [level, setLevel] = useState(1);
  /** erzwingt einen frischen Check-Durchlauf beim Wiederholen */
  const [checkRun, setCheckRun] = useState(0);

  // Abgeschlossene Schulung führt direkt zur Zusammenfassung.
  useEffect(() => {
    if (hydrated && doneCount(progress) === 6) setScreen("summary");
    // nur einmal nach der Hydration auswerten
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen, level]);

  function gotoLevel(n: number) {
    if (n >= 6) {
      setCheckRun((r) => r + 1);
      setScreen("check");
      return;
    }
    setLevel(n);
    setScreen("video");
  }

  function finishLevel(n: number) {
    completeLevel(n);
    gotoLevel(n + 1);
  }

  function finishTraining() {
    completeLevel(6);
    setScreen("summary");
  }

  if (screen === "start") {
    return (
      <StartScreen
        onStart={(name) => {
          setName(name);
          gotoLevel(progress.lvl);
        }}
        onResume={() => gotoLevel(progress.lvl)}
      />
    );
  }

  if (screen === "video") {
    return <VideoScreen level={level} onNext={() => setScreen("interaction")} />;
  }

  if (screen === "interaction") {
    const complete = () => finishLevel(level);
    switch (level) {
      case 1:
        return <Level1SelfCheck onComplete={complete} />;
      case 2:
        return <Level2Flips onComplete={complete} />;
      case 3:
        return <Level3Prompt onComplete={complete} />;
      case 4:
        return <Level4Risk onComplete={complete} />;
      default:
        return <Level5Scenes onComplete={complete} />;
    }
  }

  if (screen === "check") {
    return (
      <Level6Check
        key={checkRun}
        onFinish={finishTraining}
        onRetry={() => setCheckRun((r) => r + 1)}
      />
    );
  }

  return (
    <SummaryScreen
      onRetryCheck={() => {
        setCheckRun((r) => r + 1);
        setScreen("check");
      }}
      onReset={() => {
        setLevel(1);
        setScreen("start");
      }}
    />
  );
}
