"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { streamReport, type BirthInfo } from "@/lib/api";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { allRegions, getCities, getDistricts } from "@/lib/regions";

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
                const hasContent = content.length > 0;

                return (
                  <div key={key} id={key} className="chapter" style={!hasContent ? { opacity: 0.3 } : {}}>
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
            </div>
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
