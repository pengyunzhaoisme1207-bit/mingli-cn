import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseCard from "@/components/CaseCard";

export const metadata: Metadata = {
  title: "Famous Bazi Charts — MÍNG LÌ",
  description:
    "Explore real and historical Bazi destiny charts — from Chinese leaders to Western celebrities. See how ancient astrology reveals patterns in wealth, career, and relationships.",
  openGraph: {
    title: "Famous Bazi Charts — MÍNG LÌ",
    description:
      "Explore real and historical Bazi destiny charts — from Chinese leaders to Western celebrities.",
    type: "website",
  },
};

const eastCases = [
  {
    emoji: "🥋",
    name: "Bruce Lee 李小龙",
    years: "1940–1973",
    tagline: "Rewrote what the human body could do — left at the exact moment his chart predicted maximum tension.",
    pillars: [
      { label: "Year", stems: "庚 辰", sub: "Geng Metal · Chen Earth" },
      { label: "Month", stems: "己 亥", sub: "Ji Earth · Hai Water" },
      { label: "Day", stems: "戊 子", sub: "Wu Earth · Zi Water" },
      { label: "Hour", stems: "—", sub: "Unverified" },
    ],
    dayMaster: "Day Master: Wu Earth (戊土) · Weak",
    pattern: "Pattern: Direct Officer (正官格)",
    readings: [
      "Earth Day Master born in Water-dominant chart — constant pressure forges extraordinary discipline",
      "Official Star overwhelming weak Earth — driven by external standards, destined to break them",
      "1973 clash year activated hidden conflict in the chart — peak and end arriving simultaneously",
    ],
    quote: "A man who rewrote what the human body could do — and left at the exact moment his chart predicted maximum tension.",
    expandedAnalysis: "Bruce Lee's chart is one of the most studied in modern Bazi circles. The weakness of his Earth Day Master surrounded by Water and Metal created a personality of relentless self-improvement — never satisfied, always forging. The Official Star pattern explains his deep need to prove himself against institutional resistance (Hollywood's rejection of Asian leads). His 1973 death occurred during a year when his clash pillars converged — the same configuration that produced his greatest films also carried the seed of his exit.",
  },
  {
    emoji: "🎬",
    name: "Run Run Shaw 邵逸夫",
    years: "1907–2014 · Aged 107",
    tagline: "Built a media empire, gave away billions, lived to 107.",
    pillars: [
      { label: "Year", stems: "丁 未", sub: "Ding Fire · Wei Earth" },
      { label: "Month", stems: "癸 亥", sub: "Gui Water · Hai Water" },
      { label: "Day", stems: "甲 午", sub: "Jia Wood · Wu Fire" },
      { label: "Hour", stems: "—", sub: "Unverified" },
    ],
    dayMaster: "Day Master: Jia Wood (甲木) · Strong",
    pattern: "Pattern: Indirect Wealth (偏财格)",
    readings: [
      "Wood strong in Water month — wealth flows naturally; the Hai month nourishes the Jia Day Master like rain on a tree",
      "Fire at the year pillar (Ding) signals early financial destiny — entrepreneurship was written into the chart from birth",
      "Longevity explained by harmonious resource flow — Water produces Wood, Wood produces Fire; nothing stagnates",
    ],
    quote: "Built a media empire spanning film, television, and education. Gave away billions in philanthropy. Lived to 107 — a chart where every element feeds the next in an unbroken chain.",
    expandedAnalysis: "Run Run Shaw's chart is a textbook example of the Indirect Wealth pattern (偏财格) at its most successful. The strong Jia Wood Day Master, nourished by the Hai Water month, creates a tree that receives continuous rainfall — wealth flows naturally without effort. The Ding Fire at the year pillar signals early entrepreneurial destiny, and the Water-Wood-Fire production cycle (水生木生火) creates an unbroken chain of creative and financial energy. His 107-year lifespan is explained by the harmonious elemental flow — nothing stagnates, everything moves. Even in extreme old age, the chart's balance prevented the typical decline patterns.",
  },
  {
    emoji: "📖",
    name: "Wang Yangming 王阳明",
    years: "1472–1529",
    tagline: "Philosopher-general who achieved unity of knowledge and action.",
    pillars: [
      { label: "Year", stems: "壬 辰", sub: "Ren Water · Chen Earth" },
      { label: "Month", stems: "庚 戌", sub: "Geng Metal · Xu Earth" },
      { label: "Day", stems: "甲 子", sub: "Jia Wood · Zi Water" },
      { label: "Hour", stems: "—", sub: "Estimated" },
    ],
    dayMaster: "Day Master: Jia Wood (甲木) · Weak",
    pattern: "Pattern: Seven Killings (七杀格)",
    readings: [
      "Weak Jia Wood born in Earth month — pressure from all sides, yet the Zi Water in the Day branch provides critical resource support",
      "Seven Killings pattern with Resource salvation — the classic scholar-warrior structure: extreme adversity tempered by inner wisdom",
      "Chen-Xu clash in the Earth branches signals constant tension between idealism and pragmatism — the very engine of his philosophy",
    ],
    quote: "The greatest mind of Ming dynasty China — a philosopher who led armies, a general who wrote the most profound treatise on the mind.",
    expandedAnalysis: "Wang Yangming's chart exhibits the Seven Killings pattern (七杀格) saved by Resource (印) — one of the most powerful structures in classical Bazi. The weak Jia Wood Day Master, surrounded by Earth and Metal, would normally indicate a life of constant pressure and hardship. But the Zi Water in the Day branch acts as the crucial salvation: Resource transforms Killing into authority. This is the signature of someone who turns adversity into wisdom. The Chen-Xu clash activates the Earth branches, creating a dynamic tension between his Confucian ideals (Chen) and his pragmatic military actions (Xu). His philosophy of 知行合一 (unity of knowledge and action) maps directly onto this chart's internal dialectic: the Resource star represents knowing, the Seven Killings represents acting. That they coexist in the same structure produces a mind where thought and deed are one.",
  },
];

const westCases = [
  {
    emoji: "🚀",
    name: "Elon Musk",
    years: "1971– · Born June 28, Pretoria, South Africa",
    tagline: "PayPal → Tesla → SpaceX → X — wealth pattern repeating across industries.",
    pillars: [
      { label: "Year", stems: "辛 亥", sub: "Xin Metal · Hai Water" },
      { label: "Month", stems: "甲 午", sub: "Jia Wood · Wu Fire" },
      { label: "Day", stems: "庚 辰", sub: "Geng Metal · Chen Earth" },
      { label: "Hour", stems: "—", sub: "Estimated" },
    ],
    dayMaster: "Day Master: Geng Metal (庚金) · Strong",
    pattern: "Pattern: Indirect Wealth (偏财格) — Wealth star dominant",
    readings: [
      "Strong Metal Day Master — relentless drive, cuts through resistance, thrives under pressure; the forge makes the blade sharper",
      "Wealth star dominant with Jia Wood in month pillar — multiple fortune streams, serial entrepreneurship is structural, not accidental",
      "Clash pillars (Hai-Wu, Chen-Chen) indicate public controversy alongside meteoric rise — the chart shows both brilliance and turbulence",
    ],
    quote: "From Zip2 to PayPal to Tesla to SpaceX to X — each venture follows the same Wealth-star pattern: identify a dominant industry, enter with force, disrupt the established order.",
    disclaimer:
      "Chart reconstructed from birth records using classical Bazi methodology. Western birth certificates record civil time only — True Solar Time has been calculated for Pretoria (25.7°E).",
    expandedAnalysis: "Musk's chart reveals a classic serial entrepreneur structure. The strong Geng Metal Day Master — the forge, the sword — cuts through resistance and thrives under pressure. The Jia Wood in the month pillar creates multiple fortune streams, making serial entrepreneurship structural rather than accidental. The Hai-Wu clash indicates public controversy alongside meteoric rise, while the Chen-Chen self-penalty suggests a tendency toward self-sabotage at peak moments. Each venture follows the same Wealth-star pattern: identify a dominant industry, enter with force, and disrupt the established order. The chart shows both brilliance and turbulence in equal measure.",
  },
  {
    emoji: "💡",
    name: "Steve Jobs",
    years: "1955–2011 · Born February 24, San Francisco",
    tagline: "Founding → exile → return → iPhone — a chart of dramatic reversals.",
    pillars: [
      { label: "Year", stems: "乙 未", sub: "Yi Wood · Wei Earth" },
      { label: "Month", stems: "戊 寅", sub: "Wu Earth · Yin Wood" },
      { label: "Day", stems: "甲 戌", sub: "Jia Wood · Xu Earth" },
      { label: "Hour", stems: "—", sub: "Estimated" },
    ],
    dayMaster: "Day Master: Jia Wood (甲木) · Weak",
    pattern: "Pattern: Hurting Officer (伤官格) — Creative genius structure",
    readings: [
      "Jia Wood Day Master — visionary, growth-oriented, needs strong roots; the tree that reaches highest has the deepest foundation",
      "Hurting Officer pattern — creative genius combined with disdain for convention; this is the classic &quot;artist who changes an industry&quot; structure",
      "Early luck cycle clash explains the 1985 Apple exile; return to Apple timed with favorable Wood luck — the chart&apos;s turning point mirrors reality exactly",
    ],
    quote: "Founding Apple at 21 → forced out at 30 → return at 42 → iPhone at 52. Each phase maps to a luck cycle shift. The Hurting Officer pattern demands creative freedom — and punishes convention at every turn.",
    disclaimer:
      "Chart reconstructed from birth records using classical Bazi methodology. Western birth certificates record civil time only — True Solar Time has been calculated for San Francisco (122.4°W).",
    expandedAnalysis: "Steve Jobs' chart exhibits the Hurting Officer pattern (伤官格) — the classic creative genius structure that produces artists who change industries. The weak Jia Wood Day Master with Yi Wood support creates a tree with deep roots and high reach. The 1985 Apple exile maps perfectly to his early luck cycle clash; the return at 42 coincides with the Wood luck turning point that his chart demanded. Each career phase maps to a luck cycle shift with uncanny precision. The chart's defining tension: creative brilliance that demands absolute freedom versus the institutional structures that inevitably constrain it. The iPhone at 52 was the culmination — both systems at their peak alignment.",
  },
  {
    emoji: "👑",
    name: "Princess Diana",
    years: "1961–1997 · Born July 1, Sandringham",
    tagline: "The People&apos;s Princess — loved universally, constrained by institution, tragedy at 36.",
    pillars: [
      { label: "Year", stems: "辛 丑", sub: "Xin Metal · Chou Earth" },
      { label: "Month", stems: "甲 午", sub: "Jia Wood · Wu Fire" },
      { label: "Day", stems: "癸 酉", sub: "Gui Water · You Metal" },
      { label: "Hour", stems: "—", sub: "Estimated" },
    ],
    dayMaster: "Day Master: Gui Water (癸水) · Weak",
    pattern: "Pattern: Direct Officer (正官格) — Officer star overwhelming",
    readings: [
      "Gui Water Day Master — deeply empathetic, absorbs others&apos; pain; the dewdrop that reflects the world but evaporates under pressure",
      "Officer star overwhelms — marriage brings status and privilege but suppresses the self; the institution&apos;s weight crushes individual expression",
      "1997 clash year (Ding Chou) activated a hidden conflict pillar — the fatal outcome was structurally foretold in the chart&apos;s internal tension",
    ],
    quote: "The People&apos;s Princess — beloved by millions, trapped by protocol. Her Gui Water nature made her connect with anyone, anywhere. But the overwhelming Officer star of the institution proved too heavy for the weak Day Master to bear.",
    disclaimer:
      "Chart reconstructed from birth records using classical Bazi methodology. Western birth certificates record civil time only — True Solar Time has been calculated for Sandringham (0.6°E).",
    expandedAnalysis: "Diana's chart is perhaps the clearest example of the Officer star overwhelming a weak Day Master. The Gui Water nature — the dewdrop that reflects the world — made her universally empathetic and beloved. The Xin Metal year stem gave her a quiet dignity that resonated with the public. But the Chou Earth in the year branch and the Wu Fire month created a chart under constant pressure: the institution's weight crushing individual expression. The 1997 Ding Chou year activated hidden conflict pillars that were structurally present from birth. Both Bazi and Zi Wei systems flagged this as a danger year — the fatal outcome was foretold in the chart's internal tension.",
  },
];

export default function CasesPage() {
  return (
    <>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <p className="section-label">Famous Cases</p>
          <h1 className="section-title" style={{ maxWidth: 640, margin: "0 auto 1rem" }}>
            History&apos;s most studied charts
          </h1>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Six figures from East and West — fully analyzed using classical Bazi methodology and four major schools of scholarship.
          </p>
        </div>
      </section>

      {/* ─── FROM THE EAST ─── */}
      <section className="case-group">
        <div className="container">
          <div className="case-group-header">
            <div className="case-group-label">
              <span className="dot" /> From the East
            </div>
            <h2 className="case-group-title">Historical figures of Asia</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {eastCases.map((c, i) => (
              <CaseCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Separator ─── */}
      <div className="container">
        <div className="group-separator" />
      </div>

      {/* ─── FROM THE WEST ─── */}
      <section className="case-group">
        <div className="container">
          <div className="case-group-header">
            <div className="case-group-label">
              <span className="dot" /> From the West
            </div>
            <h2 className="case-group-title">Western figures, reconstructed charts</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {westCases.map((c, i) => (
              <CaseCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="final-cta">
        <div className="container">
          <p className="section-label">Your Turn</p>
          <h2 className="section-title">Curious about your own chart?</h2>
          <p className="section-desc" style={{ margin: "0 auto 2rem" }}>
            Your destiny is just as layered. Find out what the Four Pillars reveal about you.
          </p>
          <Link href="/reading" className="btn btn-gold" style={{ padding: "1rem 3rem", fontSize: "1.05rem" }}>
            Get my reading &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
