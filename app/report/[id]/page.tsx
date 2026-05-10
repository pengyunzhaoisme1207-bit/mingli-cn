"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { renderMarkdown } from "@/lib/renderMarkdown";

const chapterTitles: Record<string, string> = {
  ch1: "八字排盘（编码）",
  ch2: "识日主（日主性质与喜忌）",
  ch3: "观月令（节气与当令之气）",
  ch4: "日主强弱分析",
  ch5: "调候分析",
  ch6: "格局分析",
  ch7: "形象分析（清浊/真假/源流/通关）",
  ch8: "用神取用（全局喜忌）",
  ch9: "性情论",
  ch10: "疾病提示",
  ch11: "六亲分析",
  ch12: "财官（富贵贫贱）",
  ch13: "大运流年",
  ch14: "神煞辅助验证与补充推算",
  ch15: "综合判断与建议",
};

const pillars = [
  { label: "年柱", stems: "庚 午", hidden: "藏干：丁、己", tenGod: "七杀 · 正官" },
  { label: "月柱", stems: "壬 子", hidden: "藏干：癸", tenGod: "伤官 · 伤官" },
  { label: "日柱", stems: "庚 寅", hidden: "藏干：甲、丙、戊", tenGod: "偏财 · 七杀" },
  { label: "时柱", stems: "辛 巳", hidden: "藏干：丙、戊、庚", tenGod: "比肩 · 七杀" },
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
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>报告已过期</h2>
            <p className="section-desc" style={{ margin: "0 auto 2rem" }}>
              此报告已过期，或在别的浏览器中打开过。请重新生成一次解读。
            </p>
            <Link href="/reading" className="btn btn-gold">
              开始新的解读 &rarr;
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
          {/* 报告头部 + 操作按钮 */}
          <div className="report-top-bar">
            <div>
              <p className="pillars-header-label">你的命盘</p>
              <h2 className="pillars-header-title">
                {info?.name ? `${info.name} 的四柱` : "你的四柱"}
              </h2>
            </div>
            <div className="report-actions">
              <button className="report-btn" onClick={handleCopyLink}>
                {copied ? "✓ 链接已复制" : "🔗 复制链接"}
              </button>
              <button className="report-btn" onClick={handleDownloadPDF}>
                📄 下载 PDF
              </button>
            </div>
          </div>

          {/* 四柱 */}
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

          {/* 报告布局 */}
          <div className="report-layout">
            {/* 侧边导航 */}
            <nav className="report-sidebar">
              <ol className="chapter-nav-list">
                {Object.entries(chapterTitles).map(([key, title]) => (
                  <li key={key}>
                    <Link
                      href={`#${key}`}
                      className={`chapter-nav-link ${activeChapter === key ? "active" : ""}`}
                    >
                      <span className="chapter-nav-num">{key.replace("ch", "")}</span>
                      {title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {/* 内容 */}
            <div className="report-content">
              {Object.entries(chapterTitles).map(([key, title]) => {
                const content = chapters[key] || "";
                return (
                  <div key={key} id={key} className="chapter">
                    <div className="chapter-content">
                      <p className="chapter-label">{title}</p>
                      <h2 className="chapter-title">{title}</h2>
                      <div
                        className="chapter-body"
                        dangerouslySetInnerHTML={{
                          __html: content ? renderMarkdown(content) : "<p><em>生成中&hellip;</em></p>",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
