import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MÍNG LÌ — 你的命运，由此可知",
  description:
    "AI 驱动的八字命理分析。融合四柱八字与紫微斗数，四家古典流派交叉验证——30 秒生成你的专属命理报告。",
  openGraph: {
    title: "MÍNG LÌ — 你的命运，由此可知",
    description:
      "AI 驱动的八字命理分析。融合四柱八字与紫微斗数，四家古典流派交叉验证。",
    type: "website",
  },
};

const fourPillars = [
  { chinese: "年", label: "年柱", desc: "祖上根基、幼年环境、时代背景。" },
  { chinese: "月", label: "月柱", desc: "父母宫位、事业环境、核心性格特质。" },
  { chinese: "日", label: "日柱", desc: "你自己——日干即本命元神，核心本质。" },
  { chinese: "时", label: "时柱", desc: "子女归宿、晚年运势、内在隐秘世界。" },
];

const features = [
  { num: "01", title: "四家流派交叉投票", sub: "四家共识", desc: "徐乐吾、梁湘润、袁树珊、韦千里——四大古典流派独立分析你的命盘。当四家结论一致时，解读可信度达到最高。" },
  { num: "02", title: "十七部典籍 · 四万五千知识节点", sub: "十七部典籍 · 四万五千节点", desc: "完整编码唐至清全部八字命理典籍。无现代解读掺杂，仅以古典原文为据，逐条推演。" },
  { num: "03", title: "十五章十五步排盘总纲", sub: "十五步排盘", desc: "严格遵循古典十五步排盘流程——编码、识日主、观月令、强弱、调候、格局、形象、用神、性情、疾病、六亲、财官、大运、神煞、综合判断。每一步不得跳步。" },
];

const cases = [
  {
    chinese: "武", watermark: "武者",
    name: "李小龙", years: "1940–1973",
    pattern: "正官格",
    quote: "弱土生于水旺——自强不息，永不满足，百炼成钢。"
  },
  {
    chinese: "智", watermark: "智者",
    name: "乔布斯", years: "1955–2011",
    pattern: "伤官格",
    quote: "创意天才，不甘束缚——打破常规，颠覆一切。"
  },
  {
    chinese: "仁", watermark: "仁者",
    name: "戴安娜王妃", years: "1961–1997",
    pattern: "正官格",
    quote: "映照世间之露——悲悯众生，却被体制重压所摧。"
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ════════════════ SECTION 1: HERO ════════════════ */}
      <section className="hp-hero">
        <div className="hp-watermark" aria-hidden="true">命</div>
        <div className="container hp-hero-inner">
          <p className="hp-eyebrow">千年古法 · 自唐至今</p>
          <h1 className="hp-hero-title">
            知命之术<br /><em>认识你自己</em>
          </h1>
          <div className="hp-divider" />
          <p className="hp-hero-sub">
            千余年来，帝王决策先问八字。如今融汇十七部典籍、四万五千知识节点——你的命理报告，30 秒即可生成。
          </p>
          <div className="hp-hero-ctas">
            <Link href="/reading" className="hp-btn hp-btn-gold">
              解读我的命运
            </Link>
            <Link href="/sample-report" className="hp-btn hp-btn-text">
              查看示例报告 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="hp-hero-note">
            即时交付 · 十五章 · 古文术语 + 现代解读
          </p>
        </div>
      </section>

      {/* ════════════════ SECTION 2: FOUR PILLARS ════════════════ */}
      <section className="hp-pillars">
        <div className="container">
          <div className="hp-pillars-grid">
            {fourPillars.map((p, i) => (
              <div className="hp-pillar" key={i}>
                <span className="hp-pillar-char">{p.chinese}</span>
                <p className="hp-pillar-en">{p.label}</p>
                <p className="hp-pillar-sub">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 3: MANIFESTO ════════════════ */}
      <section className="hp-manifesto">
        <div className="container">
          <blockquote className="hp-manifesto-quote">
            &ldquo;八字不告你<em>将来如何</em>，只告你<em>你是谁</em>——以及时机何时到来。&rdquo;
          </blockquote>
          <p className="hp-manifesto-source">—— 《滴天髓》</p>
        </div>
      </section>

      {/* ════════════════ SECTION 4: FEATURES ════════════════ */}
      <section className="hp-features">
        <div className="container">
          <div className="hp-features-grid">
            {features.map((f, i) => (
              <div className="hp-feature" key={i}>
                <span className="hp-feature-num">{f.num}</span>
                <h3 className="hp-feature-title">{f.title}</h3>
                <p className="hp-feature-sub">{f.sub}</p>
                <p className="hp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 5: FAMOUS CASES ════════════════ */}
      <section className="hp-cases">
        <div className="container">
          <p className="hp-section-eyebrow">名人案例</p>
          <h2 className="hp-section-title">古今名盘，由此解码</h2>
          <div className="hp-cases-grid">
            {cases.map((c, i) => (
              <div className="hp-case" key={i}>
                <div className="hp-case-watermark" aria-hidden="true">{c.watermark}</div>
                <p className="hp-case-chinese" aria-hidden="true">{c.chinese}</p>
                <p className="hp-case-years">{c.years}</p>
                <h3 className="hp-case-name">{c.name}</h3>
                <p className="hp-case-pattern">{c.pattern}</p>
                <p className="hp-case-quote">{c.quote}</p>
              </div>
            ))}
          </div>
          <div className="hp-cases-cta">
            <Link href="/cases" className="hp-btn hp-btn-text">
              查看全部案例 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 6: FINAL CTA ════════════════ */}
      <section className="hp-final">
        <div className="hp-watermark" aria-hidden="true">命</div>
        <div className="container hp-final-inner">
          <h2 className="hp-final-title">你的命盘说了什么？</h2>
          <p className="hp-final-sub">
            十五章完整命理报告：日主、格局、大运、四家共识、紫微斗数交叉验证，以及个人化行动建议。
          </p>
          <Link href="/reading" className="hp-btn hp-btn-gold hp-btn-lg">
            开始我的解读
          </Link>
          <p className="hp-final-note hp-final-price">
            <span className="hp-price-promo">免费内测中</span>
          </p>
          <p className="hp-final-note">完整报告 · 即时生成</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
