import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqItem from "@/components/FaqItem";

export const metadata: Metadata = {
  title: "What is Bazi? The Four Pillars of Destiny Explained — MÍNG LÌ",
  description:
    "Bazi, or Four Pillars of Destiny, is China's most sophisticated destiny analysis system. Learn how it works, how it differs from Western astrology, and what your chart reveals.",
  openGraph: {
    title: "What is Bazi? The Four Pillars of Destiny Explained — MÍNG LÌ",
    description:
      "Bazi, or Four Pillars of Destiny, is China's most sophisticated destiny analysis system.",
    type: "website",
  },
};

export default function WhatIsBaziPage() {
  return (
    <>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <p className="section-label">Understanding Bazi</p>
          <h1 className="section-title" style={{ maxWidth: 480, margin: "0 auto" }}>
            What is Bazi?
          </h1>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            The Four Pillars of Destiny — China&apos;s most sophisticated system for understanding human fate, refined over 1,000 years.
          </p>
        </div>
      </section>

      {/* ─── BLOCK 1: Positioning ─── */}
      <section className="positioning">
        <div className="container">
          <div className="positioning-inner">
            <blockquote className="positioning-quote">
              &ldquo;Bazi is to Chinese metaphysics what a natal chart is to Western astrology — except it goes deeper.&rdquo;
            </blockquote>
            <p className="positioning-text">
              <strong>Bazi</strong> (八字, literally <em>&quot;Eight Characters&quot;</em>) maps the exact cosmic conditions at your moment of birth into <strong>four pillars</strong> — Year, Month, Day, Hour — each containing a <strong>Heavenly Stem</strong> and <strong>Earthly Branch</strong>. These eight characters become the blueprint of your personality, relationships, career, health, and the timing of major life events.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BLOCK 2: Four Pillars Diagram ─── */}
      <section className="four-pillars">
        <div className="container">
          <div className="section-header">
            <p className="section-label">The Blueprint</p>
            <h2 className="section-title">The Four Pillars</h2>
            <p className="section-desc">
              Each pillar captures a different dimension of your life. Together, they form a complete map.
            </p>
          </div>
          <div className="pillars-grid">
            {[
              { chinese: "年柱", stems: "癸巳", title: "Year Pillar", desc: "Your ancestral roots, early childhood, and the era you were born into." },
              { chinese: "月柱", stems: "甲子", title: "Month Pillar", desc: "Your parents, career environment, and dominant personality traits." },
              { chinese: "日柱", stems: "丁酉", title: "Day Pillar", desc: "You — the Day Master is your core element and identity." },
              { chinese: "时柱", stems: "戊寅", title: "Hour Pillar", desc: "Your children, later years, and hidden inner world." },
            ].map((p, i) => (
              <div className="pillar-card" key={i}>
                <p className="pillar-card-chinese">{p.chinese}</p>
                <p className="pillar-card-stems">{p.stems}</p>
                <h3 className="pillar-card-title">{p.title}</h3>
                <p className="pillar-card-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 3: Five Elements ─── */}
      <section className="five-elements">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Elemental Forces</p>
            <h2 className="section-title">The Five Elements</h2>
            <p className="section-desc">
              Everything in the chart relates back to five elemental forces — their balance, flow, and interaction.
            </p>
          </div>
          <div className="elements-grid">
            {[
              { char: "木", name: "Wood", desc: "Growth, expansion, vision, spring" },
              { char: "火", name: "Fire", desc: "Passion, expression, fame, summer" },
              { char: "土", name: "Earth", desc: "Stability, nurturing, boundaries, transition" },
              { char: "金", name: "Metal", desc: "Precision, discipline, harvest, autumn" },
              { char: "水", name: "Water", desc: "Wisdom, adaptability, depth, winter" },
            ].map((e, i) => (
              <div className="element-card" key={i}>
                <p className="element-char">{e.char}</p>
                <h3 className="element-name">{e.name}</h3>
                <p className="element-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 4: Comparison Table ─── */}
      <section className="comparison">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Comparison</p>
            <h2 className="section-title">How Bazi differs from Western astrology</h2>
          </div>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Western Astrology</th>
                  <th>Bazi (Four Pillars)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Primary input</td>
                  <td>Sun sign (birth date)</td>
                  <td>Full birth date + time + place</td>
                </tr>
                <tr>
                  <td>Core unit</td>
                  <td>Zodiac sign</td>
                  <td>Day Master element</td>
                </tr>
                <tr>
                  <td>Time analysis</td>
                  <td>Transits &amp; progressions</td>
                  <td>10-year Luck Cycles (大运)</td>
                </tr>
                <tr>
                  <td>Validation method</td>
                  <td>Single system</td>
                  <td>Four schools cross-checked</td>
                </tr>
                <tr>
                  <td>Classical texts</td>
                  <td>Limited</td>
                  <td>17 classical texts spanning Tang to Qing dynasty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── BLOCK 5: Four Schools ─── */}
      <section className="four-schools">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Methodology</p>
            <h2 className="section-title">Four schools, one consensus</h2>
            <p className="section-desc">
              MÍNG LÌ uses a voting method across four major Bazi scholarship traditions. When all four agree, the reading reaches highest confidence.
            </p>
          </div>
          <div className="schools-grid">
            {[
              { chinese: "徐乐吾", name: "Xu Lewu", desc: "The definitive commentator on classical texts. His analyses of Zi Ping Zhen Quan and Qiong Tong Bao Jian remain the authoritative standard.", method: "Pattern & Seasonal Analysis" },
              { chinese: "梁湘润", name: "Liang Xiangrun", desc: "A systematic, layer-by-layer approach to chart reading. His Three-Track system breaks down every chart into structural, dynamic, and temporal layers.", method: "Three-Track System" },
              { chinese: "袁树珊", name: "Yuan Shushan", desc: "Empirical and case-study driven. His Sixteen-Character method combines the original chart with Life Palace, Minor Limits, Major Luck, and Annual Year for maximum coverage.", method: "Sixteen-Character Method" },
              { chinese: "韦千里", name: "Wei Qianli", desc: "Practical prediction with documented accuracy. His Eight-Step method focuses on actionable outcomes — what will happen, when, and what to do about it.", method: "Eight-Step Method" },
            ].map((s, i) => (
              <div className="school-card" key={i}>
                <p className="school-chinese">{s.chinese}</p>
                <h3 className="school-name">{s.name}</h3>
                <p className="school-desc">{s.desc}</p>
                <p className="school-method">{s.method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 6: FAQ ─── */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div className="faq-list">
            <FaqItem
              question="Do I need to know my exact birth time?"
              answer="Yes, ideally to within 30 minutes. The Hour Pillar changes every two hours and significantly affects your reading. If your exact time is unknown, we can still provide a partial analysis based on your date alone — though some chapters will be less detailed."
            />
            <FaqItem
              question="Is Bazi fortune-telling?"
              answer="Not exactly. Think of it as a personality and timing map — it reveals tendencies, strengths, vulnerabilities, and favorable periods. What you do with that information is still your choice. Bazi describes probability, not destiny."
            />
            <FaqItem
              question="How is this different from the Chinese zodiac?"
              answer="The Chinese zodiac uses only your birth year — so everyone born in the same year shares the same animal sign. Bazi uses all four time pillars (year, month, day, and hour), making it vastly more precise and personal. Two people born in the same Year of the Dragon will have completely different Bazi charts."
            />
            <FaqItem
              question="How accurate is AI-generated Bazi?"
              answer="Our system draws on 17 classical texts and 45,000+ knowledge nodes. It applies the same methodology a trained human practitioner would use — manually calculating each pillar, cross-referencing classical sources, and running a four-school consensus vote — without the subjectivity or fatigue that can affect human readers."
            />
            <FaqItem
              question="Can Bazi predict specific events?"
              answer="It identifies high-probability windows for major life changes — career shifts, relationship developments, health vulnerabilities. Not a prediction of specific events, but a map of energetic conditions. Think of it as weather forecasting rather than a calendar of appointments."
            />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="final-cta">
        <div className="container">
          <p className="section-label">Your Turn</p>
          <h2 className="section-title">Ready to see your own chart?</h2>
          <Link href="/reading" className="btn btn-gold" style={{ padding: "1rem 3rem", fontSize: "1.05rem", marginBottom: "1rem" }}>
            Get my reading &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
