import { CircleCheck, FileCode2, Play, Radio, Monitor } from "lucide-react";
import type { ProjectArt as ProjectArtType } from "@/data/portfolio";

const labels: Record<ProjectArtType, { title: string; detail: string }> = {
  dashboard: { title: "SENSOR TELEMETRY", detail: "QT / MQTT" },
  bootloader: { title: "FIRMWARE INTEGRITY", detail: "STM32 / CRC32" },
  patterns: { title: "ARCHITECTURE EXPLORATIONS", detail: "MODERN C++" },
  gateway: { title: "FROM DEVICE TO DASHBOARD", detail: "SYSTEM DESIGN" },
};

export function ProjectArt({ type }: { type: ProjectArtType }) {
  return (
    <div className={`project-art art-${type}`} aria-hidden="true">
      <div className="art-kicker"><span>{labels[type].title}</span><span>{labels[type].detail}</span></div>
      {type === "dashboard" && (
        <div className="mini-dashboard">
          <div className="dashboard-top">sensor / studio<span><i className="status-dot" />MQTT CONNECTED</span></div>
          <div className="dashboard-body">
            <div className="dashboard-sidebar"><span>Overview</span><span>Temperature</span><span>Humidity</span><span>Gyroscope</span></div>
            <div className="dashboard-main">
              <div className="dashboard-metrics">
                <span>TEMPERATURE<strong>23.5°</strong></span><span>HUMIDITY<strong>48.2%</strong></span><span>BUFFER<strong>1,024</strong></span>
              </div>
              <svg viewBox="0 0 300 80" className="mini-chart">
                <path d="M0 20H300M0 40H300M0 60H300M50 0V80M100 0V80M150 0V80M200 0V80M250 0V80" stroke="#34482a" strokeWidth=".5" />
                <path d="M0 60L15 54 30 58 45 36 60 42 75 29 90 35 105 25 120 45 135 38 150 43 165 20 180 26 195 18 210 36 225 28 240 34 255 19 270 23 285 13 300 20" fill="none" stroke="#c3f58a" strokeWidth="1.8" />
                <path d="M0 70L25 63 50 68 75 56 100 61 125 54 150 65 175 59 200 64 225 52 250 58 275 47 300 51" fill="none" stroke="#98c7ce" strokeWidth="1" opacity=".7" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {type === "bootloader" && (
        <>
          <div className="boot-flow">
            <div className="boot-node"><FileCode2 /><span>APP IMAGE</span></div><span className="flow-line" />
            <div className="boot-node highlight"><CircleCheck /><span>CRC32</span></div><span className="flow-line" />
            <div className="boot-node"><Play /><span>EXECUTE</span></div>
          </div>
          <div className="boot-note">if (computed_crc == stored_crc) → jump_to_app();</div>
        </>
      )}
      {type === "patterns" && (
        <div className="patterns-art">
          <div className="pattern-code">
            <span className="green">class</span> State {"{"}<br />
            &nbsp;<span className="blue">public</span>:<br />
            &nbsp;&nbsp;<span className="green">virtual void</span><br />
            &nbsp;&nbsp;handle() = 0;<br />
            {"};"}<br />
            <span className="muted">{"// behavior, encapsulated."}</span>
          </div>
          <div className="pattern-tree">
            <div className="pattern-box primary">Context</div>
            <div className="pattern-box">«interface» State</div>
            <div className="pattern-forks"><div className="pattern-box">State A</div><div className="pattern-box">State B</div></div>
          </div>
        </div>
      )}
      {type === "gateway" && (
        <>
          <div className="gateway-art">
            <div className="gateway-end"><Radio /><span>SENSORS</span></div><span className="flow-line" />
            <div className="gateway-chip">STM32F767<span>ARM CORTEX-M7</span></div><span className="flow-line" />
            <div className="gateway-end"><Monitor /><span>MQTT / QT</span></div>
          </div>
          <div className="boot-note">BOARD BRING-UP → TELEMETRY INTEGRATION</div>
        </>
      )}
      <span className="art-caption">{type === "gateway" ? "INTENDED ARCHITECTURE / IN DEVELOPMENT" : "CONCEPTUAL PROJECT VISUALIZATION"}</span>
    </div>
  );
}
