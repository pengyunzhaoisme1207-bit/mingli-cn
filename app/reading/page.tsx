"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { streamReport, type BirthInfo } from "@/lib/api";
import { createPayOrder, checkPayStatus } from "@/lib/payment";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { allRegions, getCities, getDistricts } from "@/lib/regions";

// 前 3 章免费（约 30%），其余付费
const FREE_CHAPTERS = new Set(["ch1", "ch2", "ch3"]);

export default function ReadingPage() {
  const [phase, setPhase] = useState<"form" | "loading" | "report">("form");
  const [reportId, setReportId] = useState("");
  const [chapters, setChapters] = useState<Record<string, string>>({});
  const [pillars, setPillars] = useState([
    { label: "年柱", stems: "庚 午", hidden: "藏干：丁、己", tenGod: "七杀 · 正官" },
    { label: "月柱", stems: "壬 子", hidden: "藏干：癸", tenGod: "伤官 · 伤官" },
    { label: "日柱", stems: "庚 寅", hidden: "藏干：甲、丙、戊", tenGod: "偏财 · 七杀" },
    { label: "时柱", stems: "辛 巳", hidden: "藏干：丙、戊、庚", tenGod: "比肩 · 七杀" },
  ]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaidContent, setHasPaidContent] = useState(false);
  const [pendingOrderNo, setPendingOrderNo] = useState("");

  // 地区联动状态
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // 根据省份获取城市列表
  const availableCities = selectedProvince ? getCities(selectedProvince) : [];
  const availableDistricts = selectedProvince && selectedCity ? getDistricts(selectedProvince, selectedCity) : [];

  // 构建完整的出生地字符串
  function getFullBirthPlace(): string {
    const parts = [selectedProvince, selectedCity, selectedDistrict].filter(Boolean);
    return parts.join(" ");
  }

  const formRef = useRef<HTMLFormElement>(null);
  const paywallRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const info: BirthInfo = {
      name: fd.get("fullName") as string,
      birth_date: fd.get("birthDate") as string,
      birth_time: fd.get("birthTime") as string,
      birth_place: getFullBirthPlace() || (fd.get("birthPlace") as string),
      gender: fd.get("gender") as string,
    };

    setPhase("loading");
    setError("");
    setChapters({});
    setIsUnlocked(false);
    setHasPaidContent(false);

    // 唯一 ID：时间戳 + 随机字符串
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

              // 检测是否有付费章节开始生成
              if (!hasPaidContent && Object.keys(parsed).some((k) => !FREE_CHAPTERS.has(k))) {
                setHasPaidContent(true);
              }
            }
          } catch {
            // 忽略格式错误
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "报告生成失败");
      setPhase("form");
    }
  }

  async function handleUnlock() {
    setIsProcessing(true);
    try {
      // 1. 调用后端创建订单
      const result = await createPayOrder({
        product_name: "MÍNG LÌ 命理深度报告",
        amount: 4.9,
        project_id: "mingli-cn",
      });
      if (!result.pay_url) throw new Error("未获取到支付链接");

      // 2. 把 order_no 和 report 信息存到 localStorage（支付完回来轮询用）
      localStorage.setItem("pending_order_no", result.order_no);
      localStorage.setItem("pending_report_id", reportId);
      localStorage.setItem("pending_report_url", window.location.href);

      console.log("[payment] 跳转支付，order_no:", result.order_no, "reportId:", reportId);

      // 3. 跳转到虎皮椒支付页面
      window.location.href = result.pay_url;
    } catch (error) {
      console.error("创建订单失败:", error);
      setError("创建支付订单失败，请稍后重试");
      setPhase("form");
    } finally {
      setIsProcessing(false);
    }
  }

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

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPDF() {
    window.print();
  }

  // 滚动到付费卡片位置
  useEffect(() => {
    if (hasPaidContent && !isUnlocked && paywallRef.current) {
      setTimeout(() => {
        paywallRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [hasPaidContent, isUnlocked]);

  // 页面加载时从 localStorage 读取 pending order，开始轮询支付状态
  useEffect(() => {
    const pendingOrderNo = localStorage.getItem("pending_order_no");
    const pendingReportUrl = localStorage.getItem("pending_report_url");
    if (!pendingOrderNo) return;

    console.log("[payment] 检测到待支付订单，开始轮询:", pendingOrderNo);
    console.log("[payment] 原报告页 URL:", pendingReportUrl);

    const poll = setInterval(async () => {
      try {
        const data = await checkPayStatus(pendingOrderNo);
        console.log("[payment] 轮询结果:", JSON.stringify(data));

        if (data.status === "paid") {
          console.log("[payment] 支付成功！清除缓存并跳转到报告页");
          clearInterval(poll);
          localStorage.removeItem("pending_order_no");
          localStorage.removeItem("pending_report_id");
          localStorage.removeItem("pending_report_url");
          setIsUnlocked(true);
          // 跳转到报告页
          const reportId = localStorage.getItem("pending_report_id") || reportId;
          if (reportId) {
            router.push(`/report/${reportId}`);
          }
        } else {
          console.log("[payment] 当前状态:", data.status, "继续轮询...");
        }
      } catch (e: any) {
        console.error("[payment] 轮询失败:", e.message);
      }
    }, 2000);

    // 10 分钟超时停止轮询
    const timeout = setTimeout(() => {
      console.log("[payment] 10 分钟超时，停止轮询");
      clearInterval(poll);
    }, 600000);

    return () => {
      clearInterval(poll);
      clearTimeout(timeout);
    };
  }, []);

  // 支付成功后跳转到报告页
  useEffect(() => {
    if (isUnlocked && pendingOrderNo) {
      const reportId = localStorage.getItem("pending_report_id");
      if (reportId) {
        console.log("[payment] 解锁后跳转到报告页:", reportId);
        router.push(`/report/${reportId}`);
      }
    }
  }, [isUnlocked]);

  return (
    <>
      <Nav />

      {phase === "form" && (
        <section className="reading-hero">
          <div className="container">
            <div className="reading-hero-inner">
              <div className="reading-hero-copy">
                <p className="reading-hero-label">你的解读</p>
                <h1 className="reading-hero-title">你的解读从这里开始</h1>
                <p className="reading-hero-sub">
                  请尽可能准确地填写出生信息。出生时间相差 15 分钟都可能改变整个命盘——如果不确定，可以问问父母。
                </p>
                <ul className="reading-hero-list">
                  <li>十五章深度命理分析</li>
                  <li>四大古典流派交叉投票</li>
                  <li>紫微斗数交叉验证</li>
                  <li>日主、格局、大运……一应俱全</li>
                  <li>浏览器即时交付</li>
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
                      报告生成失败
                    </p>
                    <p style={{ color: "#C89090", fontSize: "0.85rem" }}>{error}</p>
                    <button className="btn btn-outline" style={{ marginTop: "1rem", fontSize: "0.85rem", padding: "0.5rem 1.5rem" }}
                      onClick={() => setError("")}>
                      重试
                    </button>
                  </div>
                )}
              </div>

              <div className="form-card">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">姓名</label>
                    <input className="form-input" type="text" id="fullName" name="fullName" placeholder="如何称呼你？" required />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="birthDate">出生日期</label>
                      <input className="form-input" type="date" id="birthDate" name="birthDate" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="birthTime">出生时间</label>
                      <input className="form-input" type="time" id="birthTime" name="birthTime" required />
                    </div>
                  </div>
                  <p className="form-note">越准确越好——15 分钟的差距也会影响命盘</p>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label">出生地点</label>
                    <div className="region-selector">
                      <select
                        className="region-select"
                        value={selectedProvince}
                        onChange={(e) => {
                          setSelectedProvince(e.target.value);
                          setSelectedCity("");
                          setSelectedDistrict("");
                        }}
                        required
                      >
                        <option value="">选择省份</option>
                        {allRegions.map((p) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>

                      {selectedProvince && (
                        <select
                          className="region-select"
                          value={selectedCity}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setSelectedDistrict("");
                          }}
                          required
                        >
                          <option value="">选择城市</option>
                          {availableCities.map((c) => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      )}

                      {selectedCity && availableDistricts.length > 0 && (
                        <select
                          className="region-select"
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          required
                        >
                          <option value="">选择区县</option>
                          {availableDistricts.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">性别</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input type="radio" name="gender" value="male" required />
                        男
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="gender" value="female" />
                        女
                      </label>
                    </div>
                  </div>

                  <div className="form-submit">
                    <button type="submit" className="btn btn-gold btn-full">
                      生成我的报告 &rarr;
                    </button>
                  </div>
                </form>

                <p className="form-disclaimer">你的报告约 30 秒即可生成</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {phase === "loading" && (
        <section className="loading-screen active">
          <div className="container">
            <div className="loading-spinner" />
            <h2 className="loading-title">查阅典籍中&hellip;</h2>
            <p className="loading-sub">你的命盘正在 30+ 部古典文献中交叉分析</p>
            <div className="loading-steps">
              <div className="loading-step"><span className="dot" /> 推算四柱</div>
              <div className="loading-step"><span className="dot" /> 分析格局</div>
              <div className="loading-step"><span className="dot" /> 运行四家投票</div>
              <div className="loading-step"><span className="dot" /> 紫微斗数交叉验证</div>
            </div>
          </div>
        </section>
      )}

      {phase === "report" && (
        <section className="report-section active" style={{ paddingTop: "8rem" }}>
          <div className="container">
            {/* 报告头部 + 操作按钮 */}
            <div className="report-top-bar">
              <div>
                <p className="pillars-header-label">你的命盘</p>
                <h2 className="pillars-header-title">你的四柱</h2>
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

            {/* 章节 */}
            <div className="report-chapters">
              {Object.entries(chapterTitles).map(([key, title]) => {
                const content = chapters[key] || "";
                const isPaid = !FREE_CHAPTERS.has(key);
                const isLocked = isPaid && !isUnlocked;
                const hasContent = content.length > 0;
                const isGenerating = phase === "report" && isPaid && content.length > 0;

                // 付费章节：流式生成中或已生成即实时毛玻璃
                if (isLocked) {
                  return (
                    <div key={key} className="chapter" id={key}>
                      <div className="paywall-content-blur">
                        <p className="chapter-label">{title}</p>
                        <h2 className="chapter-title">{title}</h2>
                        <div
                          className="chapter-body"
                          dangerouslySetInnerHTML={{ __html: hasContent ? renderMarkdown(content) : "<p><em>生成中&hellip;</em></p>" }}
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={key} className={`chapter ${!hasContent && !isGenerating ? "chapter-locked" : ""}`} style={!hasContent && !isGenerating ? { opacity: 0.3 } : {}}>
                    <div className="chapter-content">
                      <p className="chapter-label">{title}</p>
                      <h2 className="chapter-title">{title}</h2>
                      <div
                        className="chapter-body"
                        dangerouslySetInnerHTML={{ __html: hasContent ? renderMarkdown(content) : "<p><em>生成中&hellip;</em></p>" }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* 付费解锁卡片 - 检测到付费章节内容后立即浮现 */}
              {hasPaidContent && !isUnlocked && (
                <div ref={paywallRef} className="paywall-anchor" id="paywall">
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
        </section>
      )}

      <Footer />

      <style>{`
        /* 付费章节实时毛玻璃 */
        .paywall-content-blur {
          position: relative;
          filter: blur(8px);
          user-select: none;
          pointer-events: none;
          transition: filter 0.6s ease;
        }

        /* 解锁动画 */
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

        .paywall-btn:hover:not(:disabled) {
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
          .paywall-content-blur {
            filter: blur(6px);
          }
        }
      `}</style>
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
