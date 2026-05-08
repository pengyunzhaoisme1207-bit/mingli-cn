import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MÍNG LÌ — Your Destiny, Decoded",
  description:
    "AI-powered Chinese astrology reading. Get a comprehensive Bazi + Zi Wei Dou Shu destiny report analyzed by four classical schools — delivered instantly in your browser.",
  openGraph: {
    title: "MÍNG LÌ — Your Destiny, Decoded",
    description:
      "AI-powered Chinese astrology reading. Get a comprehensive Bazi + Zi Wei Dou Shu destiny report.",
    type: "website",
  },
};

const fourPillars = [
  { chinese: "年", pinyin: "Nián", english: "YEAR PILLAR", desc: "Ancestral roots, early childhood, the era you were born into." },
  { chinese: "月", pinyin: "Yuè", english: "MONTH PILLAR", desc: "Parents, career environment, dominant personality traits." },
  { chinese: "日", pinyin: "Rì", english: "DAY PILLAR", desc: "You — the Day Master is your core element and identity." },
  { chinese: "时", pinyin: "Shí", english: "HOUR PILLAR", desc: "Children, later years, hidden inner world." },
];

const features = [
  { num: "01", title: "Four Classical Schools Vote", sub: "四家共识", desc: "Four independent scholarly traditions — Xu Lewu, Liang Xiangrun, Yuan Shushan, Wei Qianli — analyze your chart separately. When all four agree, the reading reaches highest confidence." },
  { num: "02", title: "17 Classical Texts, 45,000 Knowledge Nodes", sub: "十七部典籍 · 四万五千节点", desc: "Our engine encodes the complete canon of Bazi scholarship from the Tang through Qing dynasties. No modern interpretations — only classical sources, applied mechanically." },
  { num: "03", title: "Zi Wei Dou Shu Cross-Validation", sub: "紫微斗数交叉验证", desc: "An entirely independent system — Purple Star Astrology — verifies or challenges the Bazi reading across eight life dimensions. Dual systems, one truth." },
];

const cases = [
  {
    chinese: "武", watermark: "武者",
    name: "Bruce Lee", years: "1940–1973",
    pattern: "Direct Officer · 正官格",
    quote: "Weak Earth forged in Water — relentless self-improvement, never satisfied, always forging."
  },
  {
    chinese: "智", watermark: "智者",
    name: "Steve Jobs", years: "1955–2011",
    pattern: "Hurting Officer · 伤官格",
    quote: "Creative genius that demands freedom — punishes convention at every turn."
  },
  {
    chinese: "仁", watermark: "仁者",
    name: "Princess Diana", years: "1961–1997",
    pattern: "Direct Officer · 正官格",
    quote: "The dewdrop that reflects the world — universally empathetic, crushed by institutional weight."
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
          <p className="hp-eyebrow">Chinese Destiny Analysis · Since the Tang Dynasty</p>
          <h1 className="hp-hero-title">
            The ancient science of<br /><em>knowing yourself</em>
          </h1>
          <div className="hp-divider" />
          <p className="hp-hero-sub">
            For over 1,000 years, emperors consulted Bazi before making decisions. Now trained on 17 classical texts and 45,000 knowledge nodes — yours takes 30 seconds.
          </p>
          <div className="hp-hero-ctas">
            <Link href="/reading" className="hp-btn hp-btn-gold">
              Reveal my destiny — $9.99
            </Link>
            <Link href="/sample-report" className="hp-btn hp-btn-text">
              See a sample report <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="hp-hero-note">
            Delivered instantly · 10 chapters · English + Classical Chinese terms
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
                <p className="hp-pillar-en">{p.english}</p>
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
            &ldquo;Bazi does not tell you what will happen. It tells you <em>who you are</em> — and when your time comes.&rdquo;
          </blockquote>
          <p className="hp-manifesto-source">— From the Dripping Sky Marrow (滴天髓), Song Dynasty</p>
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

      {/* ════════════════ SECTION 4.5: ADSENSE AD ════════════════ */}
      <section className="hp-ad-section">
        <div className="container">
          <ins
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-7338826858147459"
            data-ad-slot="1234567890"
          />
          <script dangerouslySetInnerHTML={{ __html: "(adsbygoogle = window.adsbygoogle || []).push({});" }} />
        </div>
      </section>

      {/* ════════════════ SECTION 5: FAMOUS CASES ════════════════ */}
      <section className="hp-cases">
        <div className="container">
          <p className="hp-section-eyebrow">Famous Cases</p>
          <h2 className="hp-section-title">History&apos;s charts, decoded</h2>
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
              Explore all cases <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 6: FINAL CTA ════════════════ */}
      <section className="hp-final">
        <div className="hp-watermark" aria-hidden="true">命</div>
        <div className="container hp-final-inner">
          <h2 className="hp-final-title">What does your chart say?</h2>
          <p className="hp-final-sub">
            A complete 10-chapter destiny report. Day Master, pattern, luck cycles, four-school consensus, Zi Wei cross-validation, and a personal action plan.
          </p>
          <Link href="/reading" className="hp-btn hp-btn-gold hp-btn-lg">
            Begin my reading
          </Link>
          <p className="hp-final-note">$9.99 · One-time · Delivered instantly</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
