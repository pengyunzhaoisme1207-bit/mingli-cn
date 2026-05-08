import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseCard from "@/components/CaseCard";

export const metadata: Metadata = {
  title: "名人八字命盘 — MÍNG LÌ",
  description:
    "探索真实的历史八字命盘——从中国领袖到西方名人。看古老的命理如何揭示财富、事业和感情中的规律。",
  openGraph: {
    title: "名人八字命盘 — MÍNG LÌ",
    description:
      "探索真实的历史八字命盘——从中国领袖到西方名人。",
    type: "website",
  },
};

const eastCases = [
  {
    emoji: "🥋",
    name: "李小龙",
    years: "1940–1973",
    tagline: "重新定义人体极限——在命盘预示最大张力之时离去。",
    pillars: [
      { label: "年", stems: "庚 辰", sub: "庚金 · 辰土" },
      { label: "月", stems: "己 亥", sub: "己土 · 亥水" },
      { label: "日", stems: "戊 子", sub: "戊土 · 子水" },
      { label: "时", stems: "—", sub: "未考证" },
    ],
    dayMaster: "日主：戊土 · 身弱",
    pattern: "格局：正官格",
    readings: [
      "土命生于水旺之局——持续的压力锻造出非凡的自律",
      "官星克制弱土——被外在标准驱动，注定要打破它们",
      "1973 冲年引动命局暗藏冲突——巅峰与终点同时到来",
    ],
    quote: "重新定义人体极限的人——在命盘预示最大张力的那一刻离去。",
    expandedAnalysis: "李小龙的命盘是现代八字研究中被研究最多的案例之一。土命元神被水金包围，造就了一种不断自我突破的性格——永不满足，百炼成钢。正官格解释了他需要在体制对抗中证明自己（好莱坞对亚裔主角的排斥）。1973 年去世正值冲年，命盘中的冲突支柱汇聚——造就他最伟大电影的同一种配置，也承载了他离去的种子。",
  },
  {
    emoji: "🎬",
    name: "邵逸夫",
    years: "1907–2014 · 享年107岁",
    tagline: "建立传媒帝国，捐赠数十亿，寿至 107 岁。",
    pillars: [
      { label: "年", stems: "丁 未", sub: "丁火 · 未土" },
      { label: "月", stems: "癸 亥", sub: "癸水 · 亥水" },
      { label: "日", stems: "甲 午", sub: "甲木 · 午火" },
      { label: "时", stems: "—", sub: "未考证" },
    ],
    dayMaster: "日主：甲木 · 身旺",
    pattern: "格局：偏财格",
    readings: [
      "木旺生于亥月——财运自然流入；亥水滋养甲木，如雨露润泽",
      "年柱丁火透出，早年即显财运——创业从命盘里就已注定",
      "长寿源于五行流通有情——水生木、木生火，无一停滞",
    ],
    quote: "建立了横跨影视、电视、教育的传媒帝国。捐赠数十亿慈善。寿至 107 岁——命盘中每个元素依次相生，生生不息。",
    expandedAnalysis: "邵逸夫的命盘是偏财格最成功的典型案例。甲木身旺，得亥月滋养，如同一棵不断接受雨露的大树——财运自然而来，无需费力。年柱丁火预示着早年的创业命运，水-木-火的相生链条（水生木生火）创造出创造力和财务能量的不间断循环。他 107 岁的寿命可以用五行的和谐流通来解释——没有停滞，一切都在流动。即使在极高龄，命盘的平衡也防止了典型的衰退模式。",
  },
  {
    emoji: "📖",
    name: "王阳明",
    years: "1472–1529",
    tagline: "哲学家兼将领，知行合一的典范。",
    pillars: [
      { label: "年", stems: "壬 辰", sub: "壬水 · 辰土" },
      { label: "月", stems: "庚 戌", sub: "庚金 · 戌土" },
      { label: "日", stems: "甲 子", sub: "甲木 · 子水" },
      { label: "时", stems: "—", sub: "推算" },
    ],
    dayMaster: "日主：甲木 · 身弱",
    pattern: "格局：七杀格",
    readings: [
      "甲木身弱生于土月——四面受压，但日支子水提供了关键的印星支撑",
      "七杀格配印星化杀——经典的儒将结构：极端逆境中由内在智慧淬炼",
      "辰戌冲引动土支，理想主义与现实主义之间持续张力——这正是他哲学的引擎",
    ],
    quote: "明代最伟大的思想家——一位领军队的哲学家，一位写出最深刻心学论著的将领。",
    expandedAnalysis: "王阳明的命盘展现了七杀格配印星化杀——古典八字中最有力的结构之一。甲木身弱被土金包围，本应是一生压力与艰辛。但日支子水成为关键的救赎：印星化杀为权。这是将逆境转化为智慧的标志。辰戌冲引动地支，在他的儒家理想（辰）与现实军事行动（戌）之间产生动态张力。他的知行合一哲学直接映射到此命盘的内在辩证：印星代表知，七杀代表行。二者共存于同一结构，造就了思想与行动合一的头脑。",
  },
];

const westCases = [
  {
    emoji: "🚀",
    name: "埃隆·马斯克",
    years: "1971– · 生于南非比勒陀利亚",
    tagline: "PayPal → Tesla → SpaceX → X——财富模式跨行业重复。",
    pillars: [
      { label: "年", stems: "辛 亥", sub: "辛金 · 亥水" },
      { label: "月", stems: "甲 午", sub: "甲木 · 午火" },
      { label: "日", stems: "庚 辰", sub: "庚金 · 辰土" },
      { label: "时", stems: "—", sub: "推算" },
    ],
    dayMaster: "日主：庚金 · 身旺",
    pattern: "格局：偏财格——财星当权",
    readings: [
      "金旺日主—— relentless 驱动力，破除阻力，压力下 thrive；熔炉使剑更锋利",
      "财星当权，月柱见甲木——多条财富线，连续创业是命盘结构使然，非偶然",
      "冲支柱（亥午、辰辰）预示伴随崛起的公众争议——命盘同时展现才华与动荡",
    ],
    quote: "从 Zip2 到 PayPal 到 Tesla 到 SpaceX 到 X——每次创业都遵循同样的财富模式：锁定巨头行业，强势进入，颠覆既有秩序。",
    disclaimer:
      "命盘基于出生记录以古典八字方法重建。西方出生证明仅记录标准时间——真太阳时已根据比勒陀利亚（25.7°E）计算。",
    expandedAnalysis: "马斯克的命盘揭示了典型的连续创业者结构。庚金身旺——熔炉之剑——破除阻力，压力下反而更强。月柱甲木创造多条财富线，使连续创业成为结构性特征而非偶然。亥午冲预示伴随崛起的公众争议，辰辰自刑则暗示在巅峰时刻的自我破坏倾向。每次创业都遵循同样的财富星模式：锁定巨头行业，强势进入，颠覆既有秩序。命盘同时展现才华与动荡，势均力敌。",
  },
  {
    emoji: "💡",
    name: "史蒂夫·乔布斯",
    years: "1955–2011 · 生于旧金山",
    tagline: "创立 → 放逐 → 回归 → iPhone——戏剧性反转的命盘。",
    pillars: [
      { label: "年", stems: "乙 未", sub: "乙木 · 未土" },
      { label: "月", stems: "戊 寅", sub: "戊土 · 寅木" },
      { label: "日", stems: "甲 戌", sub: "甲木 · 戌土" },
      { label: "时", stems: "—", sub: "推算" },
    ],
    dayMaster: "日主：甲木 · 身弱",
    pattern: "格局：伤官格——创意天才结构",
    readings: [
      "甲木日主——远见者，成长型，需要深厚根基；树欲参天，根必深厚",
      "伤官格——创意天才与蔑视常规的结合；这是经典的「改变行业的艺术家」结构",
      "早年大运冲克解释了 1985 年苹果放逐；回归恰逢有利木运——命盘转折与现实完全吻合",
    ],
    quote: "21 岁创立苹果 → 30 岁被迫离开 → 42 岁回归 → 52 岁 iPhone。每个阶段对应大运转换。伤官格需要绝对的创作自由——并在每个转角惩罚常规。",
    disclaimer:
      "命盘基于出生记录以古典八字方法重建。西方出生证明仅记录标准时间——真太阳时已根据旧金山（122.4°W）计算。",
    expandedAnalysis: "乔布斯的命盘展现了伤官格——经典的创意天才结构，产出改变行业的艺术家。甲木身弱得乙木帮扶，造就根深树高。1985 年的苹果放逐完美对应早年大运冲克；42 岁回归恰逢木运转折，正是命盘所需求的。每个职业阶段都以不可思议的精确度对应大运变化。命盘的核心张力：需要绝对自由的创意才华 vs. 必然限制它的体制结构。52 岁的 iPhone 是巅峰——两个系统最完美的对齐。",
  },
  {
    emoji: "👑",
    name: "戴安娜王妃",
    years: "1961–1997 · 生于英国桑德灵厄姆",
    tagline: "人民的王妃——举世爱戴，被体制所困，36 岁悲剧离世。",
    pillars: [
      { label: "年", stems: "辛 丑", sub: "辛金 · 丑土" },
      { label: "月", stems: "甲 午", sub: "甲木 · 午火" },
      { label: "日", stems: "癸 酉", sub: "癸水 · 酉金" },
      { label: "时", stems: "—", sub: "推算" },
    ],
    dayMaster: "日主：癸水 · 身弱",
    pattern: "格局：正官格——官星当权",
    readings: [
      "癸水日主——极具共情力，吸收他人之苦；映照世界的露珠，在压力下蒸发",
      "官星当权——婚姻带来地位与特权，但压抑自我；体制的重量碾碎个性表达",
      "1997 丁丑冲年引动命局暗藏冲突——悲剧结局在命盘内在张力中早有预示",
    ],
    quote: "人民的王妃——百万人爱戴，被礼仪制度所困。她的癸水本性使她能随时随地与任何人共情。但体制压倒性的官星对于身弱的日主来说太过沉重。",
    disclaimer:
      "命盘基于出生记录以古典八字方法重建。西方出生证明仅记录标准时间——真太阳时已根据桑德灵厄姆（0.6°E）计算。",
    expandedAnalysis: "戴安娜的命盘或许是官星压倒弱日主最清晰的例子。癸水本性——映照世界的露珠——使她举世共情、万人爱戴。年干辛金赋予她安静的尊严，与公众产生共鸣。但年支丑土与月支午火使命盘承受持续压力：体制重量碾碎个性表达。1997 丁丑年引动了命盘中从出生就存在的暗藏冲突支柱。八字和紫微系统都标记这是危险之年——悲剧结局在命盘内在张力中早有预示。",
  },
];

export default function CasesPage() {
  return (
    <>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <p className="section-label">名人案例</p>
          <h1 className="section-title" style={{ maxWidth: 640, margin: "0 auto 1rem" }}>
            历史上被研究最多的命盘
          </h1>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            六位东西方人物——以古典八字方法和四大流派完整分析。
          </p>
        </div>
      </section>

      {/* ─── 东方人物 ─── */}
      <section className="case-group">
        <div className="container">
          <div className="case-group-header">
            <div className="case-group-label">
              <span className="dot" /> 东方人物
            </div>
            <h2 className="case-group-title">亚洲历史人物</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {eastCases.map((c, i) => (
              <CaseCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 分隔 ─── */}
      <div className="container">
        <div className="group-separator" />
      </div>

      {/* ─── 西方人物 ─── */}
      <section className="case-group">
        <div className="container">
          <div className="case-group-header">
            <div className="case-group-label">
              <span className="dot" /> 西方人物
            </div>
            <h2 className="case-group-title">西方人物 · 重建命盘</h2>
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
          <p className="section-label">开始你的解读</p>
          <h2 className="section-title">想知道你自己的命盘吗？</h2>
          <p className="section-desc" style={{ margin: "0 auto 2rem" }}>
            你的命运同样层次丰富。看看四柱揭示了你什么。
          </p>
          <Link href="/reading" className="btn btn-gold" style={{ padding: "1rem 3rem", fontSize: "1.05rem" }}>
            开始解读 &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
