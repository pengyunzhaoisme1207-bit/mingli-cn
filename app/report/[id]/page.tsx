"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { renderMarkdown } from "@/lib/renderMarkdown";
// TODO: re-enable paywall when payment is ready
// import UnlockCard from "@/components/UnlockCard";

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

const pillars = [
  { label: "Year Pillar", stems: "庚 午", hidden: "Hidden Stems: Ding, Ji", tenGod: "7K · DO" },
  { label: "Month Pillar", stems: "壬 子", hidden: "Hidden Stems: Gui", tenGod: "EG · EG" },
  { label: "Day Pillar", stems: "庚 寅", hidden: "Hidden Stems: Jia, Bing, Wu", tenGod: "IW · 7K" },
  { label: "Hour Pillar", stems: "辛 巳", hidden: "Hidden Stems: Bing, Wu, Geng", tenGod: "DW · 7K" },
];

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [chapters, setChapters] = useState<Record<string, string>>({});
  const [activeChapter, setActiveChapter] = useState("ch1");
  const [info, setInfo] = useState<{ name: string } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`report_${id}`);
    if (stored) {
      const data = JSON.parse(stored);
      setChapters(data.chapters || {});
      setInfo(data.info || null);
    } else {
      setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    document.querySelectorAll(".chapter").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPDF() {
    window.print();
  }

  if (notFound) {
    return (
      <>
        <Nav />
        <section style={{ paddingTop: "8rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>This report has expired</h2>
            <p className="section-desc" style={{ margin: "0 auto 2rem" }}>
              This report has expired or was opened in a different browser. Please generate a new reading.
            </p>
            <Link href="/reading" className="btn btn-gold">
              Get a new reading &rarr;
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section style={{ paddingTop: "8rem" }}>
        <div className="container">
          {/* Report Header with Action Buttons */}
          <div className="report-top-bar">
            <div>
              <p className="pillars-header-label">Your Chart</p>
              <h2 className="pillars-header-title">
                {info?.name ? `${info.name}&apos;s Four Pillars` : "Your Four Pillars"}
              </h2>
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

          {/* Report Layout */}
          <div className="report-layout">
            {/* Sidebar */}
            <nav className="report-sidebar">
              <ol className="chapter-nav-list">
                {Object.entries(chapterTitles).map(([key, title]) => (
                  <li key={key}>
                    <Link
                      href={`#${key}`}
                      className={`chapter-nav-link ${activeChapter === key ? "active" : ""}`}
                    >
                      <span className="chapter-nav-num">{key.replace("ch", "")}</span>
                      {title.split("(")[0].trim()}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Content */}
            <div className="report-content">
              {Object.entries(chapterTitles).map(([key, title]) => {
                const content = chapters[key] || "";
                // TODO: re-enable paywall when payment is ready
                // const locked = key !== "ch1";
                return (
                  <div key={key} id={key} className={`chapter ${false ? "chapter-locked" : ""}`}>
                    <div className="chapter-content">
                      <p className="chapter-label">{title}</p>
                      <h2 className="chapter-title">{title}</h2>
                      <div
                        className="chapter-body"
                        dangerouslySetInnerHTML={{
                          __html: content ? renderMarkdown(content) : "<p><em>Generating&hellip;</em></p>",
                        }}
                      />
                    </div>
                    {/* TODO: re-enable paywall when payment is ready */}
                    {/* {false && <div className="chapter-overlay" />} */}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TODO: re-enable paywall when payment is ready */}
          {/* <UnlockCard /> */}
        </div>
      </section>
      <Footer />
    </>
  );
}
