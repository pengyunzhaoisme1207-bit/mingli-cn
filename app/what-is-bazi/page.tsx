import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqItem from "@/components/FaqItem";

export const metadata: Metadata = {
  title: "什么是八字？四柱命理详解 — MÍNG LÌ",
  description:
    "八字，又称四柱命理，是中国最精密的命运分析体系。了解它的原理、与西方星座的区别，以及你的命盘能揭示什么。",
  openGraph: {
    title: "什么是八字？四柱命理详解 — MÍNG LÌ",
    description:
      "八字，又称四柱命理，是中国最精密的命运分析体系。",
    type: "website",
  },
};

export default function WhatIsBaziPage() {
  return (
    <>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: "8rem", paddingBottom: "2rem", textAlign: "center" }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#fcd34d] mb-4">
            什么是八字？
          </h1>
          <p className="text-lg text-gray-300 text-center tracking-wide mb-12">
            四柱命理——中国最精密的人类命运解析体系，历经千年锤炼。
          </p>
        </div>
      </section>

      {/* ─── BLOCK 1: Positioning ─── */}
      <section className="positioning">
        <div className="container">
          <div className="positioning-inner">
            <blockquote className="text-xl md:text-2xl font-serif text-[#fcd34d] text-center max-w-3xl mx-auto leading-relaxed mb-8 opacity-90">
              八字之于中国玄学，犹如本命星盘之于西方占星——且更为深入。
            </blockquote>
            <p className="text-base md:text-lg text-gray-400 text-center max-w-2xl mx-auto leading-loose">
              <strong>八字</strong>（四柱），将你的出生时刻的宇宙条件精确映射为<strong>四根支柱</strong>——年、月、日、时——每根柱含一个<strong>天干</strong>和一个<strong>地支</strong>。这八个字即是你性格、人际关系、事业、健康以及重大人生事件时机的蓝图。
            </p>
          </div>
        </div>
      </section>

      {/* ─── BLOCK 2: Four Pillars Diagram ─── */}
      <section className="four-pillars" style={{ marginTop: "5rem" }}>
        <div className="container">
          <p className="text-sm font-medium text-[#fcd34d] uppercase tracking-[0.2em] mb-3 text-center opacity-80">
            命运蓝图
          </p>
          <h2 className="section-title text-center mb-10">四柱</h2>
          <div className="pillars-grid">
            {[
              { label: "年柱", stems: "癸巳", desc: "祖上根基、幼年环境、你出生的时代背景。" },
              { label: "月柱", stems: "甲子", desc: "父母宫位、事业环境、核心性格特质。" },
              { label: "日柱", stems: "丁酉", desc: "你自己——日干即本命元神，核心本质。" },
              { label: "时柱", stems: "戊寅", desc: "子女归宿、晚年运势、内在隐秘世界。" },
            ].map((p, i) => (
              <div className="pillar-card" key={i}>
                <p className="text-xs text-gray-500 mb-2">{p.label}</p>
                <p className="text-3xl font-bold text-[#fcd34d] mb-3">{p.stems}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 3: Five Elements ─── */}
      <section className="five-elements" style={{ marginTop: "5rem" }}>
        <div className="container">
          <p className="text-sm font-medium text-[#fcd34d] uppercase tracking-[0.2em] mb-3 text-center opacity-80">
            五行之力
          </p>
          <h2 className="section-title text-center mb-10">五行</h2>
          <p className="text-base md:text-lg text-gray-400 text-center max-w-2xl mx-auto leading-loose mb-10">
            命盘中的一切关系都回归五种元素的力量——它们的平衡、流转与相互作用。
          </p>
          <div className="elements-grid">
            {[
              { char: "木", name: "木", desc: "生长、扩张、远见、春季" },
              { char: "火", name: "火", desc: "热情、表达、名声、夏季" },
              { char: "土", name: "土", desc: "稳定、滋养、界限、过渡" },
              { char: "金", name: "金", desc: "精准、自律、收获、秋季" },
              { char: "水", name: "水", desc: "智慧、适应力、深度、冬季" },
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
      <section className="comparison" style={{ marginTop: "5rem" }}>
        <div className="container">
          <p className="text-sm font-medium text-[#fcd34d] uppercase tracking-[0.2em] mb-3 text-center opacity-80">
            对比
          </p>
          <h2 className="section-title text-center mb-10">八字与西方占星的区别</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>维度</th>
                  <th>西方占星</th>
                  <th>八字（四柱命理）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>核心输入</td>
                  <td>太阳星座（出生日期）</td>
                  <td>完整出生日期 + 时辰 + 地点</td>
                </tr>
                <tr>
                  <td>基本单位</td>
                  <td>十二星座</td>
                  <td>日主五行</td>
                </tr>
                <tr>
                  <td>时间分析</td>
                  <td>行运与推运</td>
                  <td>十年大运（大运）</td>
                </tr>
                <tr>
                  <td>验证方式</td>
                  <td>单一体系</td>
                  <td>四家流派交叉验证</td>
                </tr>
                <tr>
                  <td>典籍依据</td>
                  <td>有限</td>
                  <td>17 部典籍，跨越唐至清</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── BLOCK 5: Four Schools ─── */}
      <section className="four-schools" style={{ marginTop: "5rem" }}>
        <div className="container">
          <p className="text-sm font-medium text-[#fcd34d] uppercase tracking-[0.2em] mb-3 text-center opacity-80">
            方法论
          </p>
          <h2 className="section-title text-center mb-10">四家流派，一个共识</h2>
          <p className="text-base md:text-lg text-gray-400 text-center max-w-2xl mx-auto leading-loose mb-10">
            MÍNG LÌ 采用四大命理流派的投票方法。当四家结论一致时，解读达到最高可信度。
          </p>
          <div className="schools-grid">
            {[
              { chinese: "徐乐吾", name: "徐乐吾", desc: "古典典籍权威注释者。其对《子平真诠》和《穷通宝鉴》的评析至今仍是权威标准。", method: "格局与月令分析法" },
              { chinese: "梁湘润", name: "梁湘润", desc: "系统化、逐层深入的命理解读方法。其三轨制将命盘分为结构、动态和时间三个层面。", method: "三轨制" },
              { chinese: "袁树珊", name: "袁树珊", desc: "实证与案例驱动。其十六字法将原局与命宫、小限、大运、流年结合，实现最大覆盖。", method: "十六字法" },
              { chinese: "韦千里", name: "韦千里", desc: "实战预测，准确性有据可查。其八步法聚焦可行动的结果——会发生什么、何时发生、如何应对。", method: "八步法" },
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
      <section className="faq" style={{ marginTop: "5rem" }}>
        <div className="container">
          <p className="text-sm font-medium text-[#fcd34d] uppercase tracking-[0.2em] mb-3 text-center opacity-80">
            常见问题
          </p>
          <h2 className="section-title text-center mb-10">你可能想知道</h2>
          <div className="faq-list">
            <FaqItem
              question="我需要知道精确的出生时间吗？"
              answer="是的，最好精确到 30 分钟以内。时柱每两小时变化一次，对解读影响很大。如果不知道确切时间，我们仍然可以基于出生日期提供部分分析——尽管部分章节会不够详尽。"
            />
            <FaqItem
              question="八字是算命吗？"
              answer="不完全是。把它理解为性格与时机的地图——它揭示你的倾向、优势、弱点和有利时段。如何利用这些信息，仍取决于你的选择。八字描述的是概率，而非宿命。"
            />
            <FaqItem
              question="这和生肖有什么区别？"
              answer="生肖只看出生年份——同一年出生的人都属同一个生肖。八字使用全部四根柱（年、月、日、时），精确度和个人化程度远超生肖。两个同属龙年的人，八字命盘可能完全不同。"
            />
            <FaqItem
              question="AI 生成的八字准确吗？"
              answer="我们的系统基于 17 部典籍和 45,000+ 知识节点。它采用训练有素的命理师所使用的同样方法——逐柱计算、交叉引用典籍、运行四家共识投票——且不受人类读者可能有的主观判断或疲劳影响。"
            />
            <FaqItem
              question="八字能预测具体事件吗？"
              answer="它识别重大人生变化的高概率窗口——事业转折、感情发展、健康隐患。不是对具体事件的预测，而是能量条件的地图。就像天气预报，而不是日程表。"
            />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="final-cta" style={{ marginTop: "5rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="text-sm font-medium text-[#fcd34d] uppercase tracking-[0.2em] mb-3 text-center opacity-80">
            开始你的解读
          </p>
          <h2 className="section-title mb-10">准备好看看你的命盘了吗？</h2>
          <Link href="/reading" className="btn btn-gold" style={{ padding: "1rem 3rem", fontSize: "1.05rem" }}>
            开始解读 &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
