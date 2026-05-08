"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { streamReport, type BirthInfo } from "@/lib/api";
import { renderMarkdown } from "@/lib/renderMarkdown";

export default function ReadingPage() {
  const [phase, setPhase] = useState<"form" | "loading" | "report">("form");
  const [reportId, setReportId] = useState("");
  const [chapters, setChapters] = useState<Record<string, string>>({});
  const [pillars, setPillars] = useState([
    { label: "Year Pillar", stems: "庚 午", hidden: "Hidden Stems: Ding, Ji", tenGod: "7K · DO" },
    { label: "Month Pillar", stems: "壬 子", hidden: "Hidden Stems: Gui", tenGod: "EG · EG" },
    { label: "Day Pillar", stems: "庚 寅", hidden: "Hidden Stems: Jia, Bing, Wu", tenGod: "IW · 7K" },
    { label: "Hour Pillar", stems: "辛 巳", hidden: "Hidden Stems: Bing, Wu, Geng", tenGod: "DW · 7K" },
  ]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const info: BirthInfo = {
      name: fd.get("fullName") as string,
      birth_date: fd.get("birthDate") as string,
      birth_time: fd.get("birthTime") as string,
      birth_place: fd.get("birthPlace") as string,
      gender: fd.get("gender") as string,
    };

    setPhase("loading");
    setError("");
    setChapters({});

    // Unique ID: timestamp + random hex
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setReportId(id);

    try {
      const reader = await streamReport(info);
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";
      let latestChapters: Record<string, string> = {};

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const evt of events) {
          const m = evt.match(/^data: (.+)$/m);
          if (!m) continue;
          try {
            const data = JSON.parse(m[1]);
            if (data.error) {
              setError(data.error);
              setPhase("form");
              return;
            }
            if (data.done) {
              // Save parsed chapters from the full text we've accumulated
              const reportData = { info, pillars, chapters: latestChapters };
              localStorage.setItem(`report_${id}`, JSON.stringify(reportData));
              router.push(`/report/${id}`);
              return;
            }
            if (data.chunk) {
              fullText += data.chunk;
              const parsed = parseChaptersFromText(fullText);
              latestChapters = parsed;
              setChapters(parsed);
              setPhase("report");
            }
          } catch {
            // Ignore malformed
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate report");
      setPhase("form");
    }
  }

  const chapterTitles: Record<string, string> = {
    ch1: "八字排盘 / Bazi Chart Setup",
    ch2: "日主强弱与格局 / Day Master & Pattern",
    ch3: "形象、性情与健康 / Image, Temperament & Health",
    ch4: "六亲与财官 / Family, Wealth & Career",
    ch5: "大运流年 / Major Luck Cycles & Annual Years",
    ch6: "补充推算 / Supplementary Calculations",
    ch7: "四家投票 / Four Masters Voting",
    ch8: "紫微斗数分析 / Zi Wei Dou Shu Analysis",
    ch9: "双系统交叉验证 / Dual-System Cross Validation",
    ch10: "综合建议 / Comprehensive Advice",
  };

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPDF() {
    window.print();
  }

  return (
    <>
      <Nav />

      {phase === "form" && (
        <section className="reading-hero">
          <div className="container">
            <div className="reading-hero-inner">
              <div className="reading-hero-copy">
                <p className="reading-hero-label">Your Reading</p>
                <h1 className="reading-hero-title">Your reading starts here</h1>
                <p className="reading-hero-sub">
                  Enter your birth details as accurately as possible. Even a 15-minute difference in birth time can shift the entire chart — so ask your parents if you&apos;re unsure.
                </p>
                <ul className="reading-hero-list">
                  <li>10 chapters of deep analysis</li>
                  <li>Four classical schools vote on your chart</li>
                  <li>Zi Wei Dou Shu cross-validation</li>
                  <li>Day Master, pattern, luck cycles &amp; more</li>
                  <li>Delivered instantly in your browser</li>
                </ul>
                {error && (
                  <div style={{
                    background: "#2D1B1B",
                    border: "1px solid #8B3A3A",
                    borderRadius: 12,
                    padding: "1.5rem",
                    marginTop: "1.5rem",
                    textAlign: "center",
                  }}>
                    <p style={{ color: "#F0A0A0", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>
                      Unable to generate report
                    </p>
                    <p style={{ color: "#C89090", fontSize: "0.85rem" }}>{error}</p>
                    <button className="btn btn-outline" style={{ marginTop: "1rem", fontSize: "0.85rem", padding: "0.5rem 1.5rem" }}
                      onClick={() => setError("")}>
                      Try again
                    </button>
                  </div>
                )}
              </div>

              <div className="form-card">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full name</label>
                    <input className="form-input" type="text" id="fullName" name="fullName" placeholder="How should we address you?" required />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="birthDate">Date of birth</label>
                      <input className="form-input" type="date" id="birthDate" name="birthDate" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="birthTime">Time of birth</label>
                      <input className="form-input" type="time" id="birthTime" name="birthTime" required />
                    </div>
                  </div>
                  <p className="form-note">As accurate as possible — even 15 min matters</p>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="birthPlace">Place of birth</label>
                    <input className="form-input" type="text" id="birthPlace" name="birthPlace" placeholder="City, Country" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input type="radio" name="gender" value="male" required />
                        Male
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="gender" value="female" />
                        Female
                      </label>
                    </div>
                  </div>

                  <div className="form-submit">
                    <button type="submit" className="btn btn-gold btn-full">
                      Generate my reading &rarr;
                    </button>
                  </div>
                </form>

                <p className="form-disclaimer">Your report will be ready in about 30 seconds</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {phase === "loading" && (
        <section className="loading-screen active">
          <div className="container">
            <div className="loading-spinner" />
            <h2 className="loading-title">Reading the classics&hellip;</h2>
            <p className="loading-sub">Your chart is being analyzed across 30+ classical texts</p>
            <div className="loading-steps">
              <div className="loading-step"><span className="dot" /> Calculating Four Pillars</div>
              <div className="loading-step"><span className="dot" /> Analyzing chart pattern</div>
              <div className="loading-step"><span className="dot" /> Running Four Schools vote</div>
              <div className="loading-step"><span className="dot" /> Cross-validating with Zi Wei Dou Shu</div>
            </div>
          </div>
        </section>
      )}

      {phase === "report" && (
        <section className="report-section active" style={{ paddingTop: "8rem" }}>
          <div className="container">
            {/* Report Header with Action Buttons */}
            <div className="report-top-bar">
              <div>
                <p className="pillars-header-label">Your Chart</p>
                <h2 className="pillars-header-title">Your Four Pillars</h2>
              </div>
              <div className="report-actions">
                <button className="report-btn" onClick={handleCopyLink}>
                  {copied ? "✓ Link copied!" : "🔗 Copy link"}
                </button>
                <button className="report-btn" onClick={handleDownloadPDF}>
                  📄 Download PDF
                </button>
              </div>
            </div>

            {/* Four Pillars */}
            <div className="pillars-table">
              {pillars.map((p, i) => (
                <div className="pillar" key={i}>
                  <p className="pillar-label">{p.label}</p>
                  <p className="pillar-stems">{p.stems}</p>
                  {p.hidden && <p className="pillar-hidden">{p.hidden}</p>}
                  {p.tenGod && <p className="pillar-ten-god">{p.tenGod}</p>}
                </div>
              ))}
            </div>

            {/* Chapters */}
            <div className="report-chapters">
              {Object.entries(chapterTitles).map(([key, title]) => {
                const content = chapters[key] || "";
                const hasContent = content.length > 0;
                // TODO: re-enable paywall when payment is ready
                // const locked = key !== "ch1";
                return (
                  <div key={key} className={`chapter ${false ? "chapter-locked" : ""}`} style={!hasContent ? { opacity: 0.3 } : {}}>
                    <div className="chapter-content">
                      <p className="chapter-label">{title.split(" ")[0] === "Chapter" ? title : `Chapter ${key.replace("ch", "")}`}</p>
                      <h2 className="chapter-title">{title}</h2>
                      <div
                        className="chapter-body"
                        dangerouslySetInnerHTML={{ __html: hasContent ? renderMarkdown(content) : "<p><em>Generating&hellip;</em></p>" }}
                      />
                    </div>
                    {/* TODO: re-enable paywall when payment is ready */}
                    {/* {false && <div className="chapter-overlay" />} */}
                  </div>
                );
              })}
            </div>

            {/* TODO: re-enable paywall when payment is ready */}
            {/* <UnlockCard /> */}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

function parseChaptersFromText(text: string): Record<string, string> {
  const chapters: Record<string, string> = {};
  const lines = text.split("\n");
  let currentChapter: string | null = null;
  const currentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(/^## Chapter (\d+)/);
    if (match) {
      if (currentChapter) {
        chapters[currentChapter] = currentLines.join("\n").trim();
      }
      const num = parseInt(match[1]);
      currentChapter = num === 1 ? "ch1" : `ch${num}`;
      currentLines.length = 0;
      currentLines.push(line);
    } else {
      if (currentChapter) {
        currentLines.push(line);
      }
    }
  }

  if (currentChapter) {
    chapters[currentChapter] = currentLines.join("\n").trim();
  }

  return chapters;
}
