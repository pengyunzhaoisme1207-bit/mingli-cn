"use client";

import { useState } from "react";

interface Pillar {
  label: string;
  stems: string;
  sub: string;
}

interface CaseCardProps {
  emoji: string;
  name: string;
  years: string;
  tagline: string;
  pillars: Pillar[];
  dayMaster: string;
  pattern: string;
  readings: string[];
  quote: string;
  disclaimer?: string;
  expandedAnalysis?: string;
}

export default function CaseCard({
  emoji,
  name,
  years,
  tagline,
  pillars,
  dayMaster,
  pattern,
  readings,
  quote,
  disclaimer,
  expandedAnalysis,
}: CaseCardProps) {
  const [open, setOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);

  return (
    <div className={`case-card ${open ? "open" : ""}`}>
      <div className="case-summary" onClick={() => setOpen(!open)}>
        <div className="case-summary-inner">
          <div className="case-avatar">{emoji}</div>
          <div className="case-meta">
            <h3 className="case-name">{name}</h3>
            <p className="case-years">{years}</p>
            <p className="case-tagline">{tagline}</p>
          </div>
          <div className="case-expand-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="case-detail">
        <div className="case-detail-inner">
          {disclaimer && <div className="western-disclaimer">{disclaimer}</div>}

          {/* Pillars */}
          <div className="pillars-mini">
            {pillars.map((p, i) => (
              <div className="pillar-cell" key={i}>
                <p className="pillar-cell-label">{p.label}</p>
                <p className="pillar-cell-stems">{p.stems}</p>
                <p className="pillar-cell-sub">{p.sub}</p>
              </div>
            ))}
          </div>

          <div className="analysis-block">
            <p className="analysis-label">{dayMaster}</p>
          </div>
          <div className="analysis-block">
            <p className="analysis-label">{pattern}</p>
          </div>
          <div className="analysis-block">
            <p className="analysis-label">Key Reading Points</p>
            <ul className="analysis-list">
              {readings.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="analysis-block">
            <p className="analysis-label">Historical Validation</p>
            <p className="analysis-quote">{quote}</p>
          </div>

          {expandedAnalysis && (
            <>
              <button
                className="case-expand-btn"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Hide analysis ↑" : "Show full analysis ↓"}
              </button>
              {showFull && (
                <div className="case-expanded">
                  <p>{expandedAnalysis}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
