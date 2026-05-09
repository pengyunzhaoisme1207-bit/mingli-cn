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

// 前 3 章免费（约 30%），其余付费
const FREE_CHAPTERS = ["ch1", "ch2", "ch3"];

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [chapters, setChapters] = useState<Record<string, string>>({});
  const [activeChapter, setActiveChapter] = useState("ch1");
  const [info, setInfo] = useState<{ name: string } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  async function handleUnlock() {
    setIsProcessing(true);
    // 模拟支付请求（2 秒）
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    setIsUnlocked(true);
  }

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
                {Object.entries(chapterTitles).map(([key, title]) => {
                  const isLocked = !isUnlocked && !FREE_CHAPTERS.includes(key);
                  return (
                    <li key={key}>
                      <Link
                        href={`#${key}`}
                        className={`chapter-nav-link ${activeChapter === key ? "active" : ""} ${isLocked ? "locked" : ""}`}
                      >
                        <span className="chapter-nav-num">{key.replace("ch", "")}</span>
                        {title}
                        {isLocked && <span className="lock-icon">🔒</span>}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* 内容 */}
            <div className="report-content">
              {Object.entries(chapterTitles).map(([key, title]) => {
                const content = chapters[key] || "";
                const isLocked = !isUnlocked && !FREE_CHAPTERS.includes(key);
                return (
                  <div key={key} id={key} className="chapter">
                    {isLocked ? (
                      <div className="paywall-content-blur">
                        <p className="chapter-label">{title}</p>
                        <h2 className="chapter-title">{title}</h2>
                        <div
                          className="chapter-body"
                          dangerouslySetInnerHTML={{
                            __html: content ? renderMarkdown(content) : "<p><em>生成中&hellip;</em></p>",
                          }}
                        />
                      </div>
                    ) : (
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
                    )}
                  </div>
                );
              })}

              {/* 付费解锁卡片 */}
              {!isUnlocked && (
                <div className="paywall-anchor" id="paywall">
                  <div className="paywall-card">
                    <div className="paywall-icon">📜</div>
                    <h3 className="paywall-title">深度解析报告已生成</h3>
                    <p className="paywall-desc">
                      包含学业潜力、性格短板及核心培养建议。<br />
                      完整解读涵盖十五章命理分析与紫微斗数交叉验证。
                    </p>
                    <div className="paywall-divider" />
                    <p className="paywall-price">
                      <span className="paywall-price-original">¥9.9</span>
                      <span className="paywall-price-promo">限时优惠 ¥4.9</span>
                    </p>
                    <button
                      className={`paywall-btn ${isProcessing ? "paywall-btn-loading" : ""}`}
                      onClick={handleUnlock}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="paywall-spinner" />
                          正在处理...
                        </>
                      ) : (
                        "支付 ¥4.9 解锁全篇"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <style>{`
        /* 侧边栏锁定章节 */
        .chapter-nav-link.locked {
          opacity: 0.4;
          pointer-events: none;
        }
        .lock-icon {
          font-size: 0.7em;
          margin-left: 4px;
          opacity: 0.6;
        }

        /* 付费章节实时毛玻璃 */
        .paywall-content-blur {
          position: relative;
          filter: blur(8px);
          user-select: none;
          pointer-events: none;
          transition: filter 0.6s ease;
        }

        .paywall-content-blur.unlocked {
          filter: none;
          user-select: auto;
          pointer-events: auto;
        }

        /* 付费卡片容器 */
        .paywall-anchor {
          position: relative;
          margin: 2rem 0 3rem;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .paywall-card {
          position: relative;
          background: rgba(20, 22, 32, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(201, 169, 110, 0.25);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          text-align: center;
          width: 90%;
          max-width: 420px;
          z-index: 10;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 169, 110, 0.05);
          animation: paywallFadeIn 0.6s ease;
        }

        @keyframes paywallFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .paywall-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .paywall-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }

        .paywall-desc {
          font-size: 0.85rem;
          color: var(--text-dim);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }

        .paywall-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0 0 1.25rem;
        }

        .paywall-price {
          color: var(--text);
          font-weight: 700;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .paywall-price-original {
          font-size: 1rem;
          text-decoration: line-through;
          color: var(--text-dim);
        }

        .paywall-price-promo {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--gold);
        }

        .paywall-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 0.85rem 2rem;
          background: linear-gradient(135deg, var(--gold-dark), var(--gold));
          color: #07080D;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }

        .paywall-btn:hover {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          box-shadow: 0 4px 20px rgba(201, 169, 110, 0.3);
          transform: translateY(-1px);
        }

        .paywall-btn:active {
          transform: translateY(0);
        }

        .paywall-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .paywall-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(7, 8, 13, 0.3);
          border-top-color: var(--bg);
          border-radius: 50%;
          animation: paywall-spin 0.8s linear infinite;
        }

        @keyframes paywall-spin {
          to { transform: rotate(360deg); }
        }

        /* 移动端适配 */
        @media (max-width: 768px) {
          .paywall-card {
            padding: 2rem 1.5rem;
            max-width: 360px;
          }
          .paywall-title {
            font-size: 1.1rem;
          }
          .paywall-amount {
            font-size: 1.8rem;
          }
          .paywall-anchor {
            min-height: 280px;
          }
        }
      `}</style>
    </>
  );
}
