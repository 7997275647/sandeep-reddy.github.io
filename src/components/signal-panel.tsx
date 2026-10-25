"use client";

import { useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const noisySignal = Array.from({ length: 101 }, (_, index) => {
  const x = index * 4;
  const y = 82 - Math.sin(index / 9) * 32 - Math.sin(index * 2.9) * 11 - Math.cos(index * 1.7) * 5;
  return `${index === 0 ? "M" : "L"}${x},${y.toFixed(2)}`;
}).join(" ");
const filteredSignal = Array.from({ length: 101 }, (_, index) => {
  const x = index * 4;
  const y = 82 - Math.sin(index / 9) * 32;
  return `${index === 0 ? "M" : "L"}${x},${y.toFixed(2)}`;
}).join(" ");

export function SignalPanel() {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const isPaused = paused || reducedMotion;

  return (
    <div>
      <div className={cn("signal-panel", isPaused && "scope-paused")}>
        <div className="signal-toolbar">
          <span>01 / SIGNAL PROCESSING</span>
          <div className="signal-controls">
            <span className="status-dot" aria-hidden="true" />
            <span>{isPaused ? "PAUSED" : "RUN"}</span>
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={isPaused ? "Play signal animation" : "Pause signal animation"}
              aria-pressed={!isPaused}
              disabled={Boolean(reducedMotion)}
              title={reducedMotion ? "Animation disabled by your reduced-motion preference" : undefined}
            >
              {isPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div className="scope-chart">
          <svg viewBox="0 0 400 167" role="img" aria-labelledby="signal-title signal-description">
            <title id="signal-title">Illustrative signal filtering</title>
            <desc id="signal-description">A noisy input and a smoother filtered output. This is an illustration, not recorded benchmark data.</desc>
            <defs>
              <pattern id="scope-grid" width="40" height="32" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V32" fill="none" stroke="#6b8151" strokeOpacity=".19" strokeWidth=".6" />
              </pattern>
              <clipPath id="scope-clip"><rect width="400" height="160" /></clipPath>
            </defs>
            <rect width="400" height="160" fill="url(#scope-grid)" />
            <path d="M0 82H400" stroke="#6b8151" strokeOpacity=".3" strokeDasharray="3 5" />
            <path d={noisySignal} fill="none" stroke="#779392" strokeWidth="1" opacity=".7" />
            <path d={filteredSignal} fill="none" stroke="#c3f58a" strokeWidth="2.1" />
            <g clipPath="url(#scope-clip)">
              <g className="scope-scan">
                <rect x="-17" width="17" height="160" fill="#c3f58a" opacity=".05" />
                <path d="M0 0V160" stroke="#c3f58a" strokeWidth=".8" opacity=".5" />
              </g>
            </g>
          </svg>
        </div>
        <div className="scope-legend">
          <span><i aria-hidden="true" />Input signal</span><span><i aria-hidden="true" />Filtered output</span>
        </div>
        <div className="signal-foot">
          <strong>2×</strong>
          <p>Faster motor-control filtering<span>CORTEX-M4 / CMSIS-DSP / HILTI THESIS</span></p>
        </div>
      </div>
      <p className="signal-disclaimer">Illustrative signal. Performance result reported in my master&apos;s thesis.</p>
    </div>
  );
}
