/**
 * Library content registry.
 * Mirrors the navigation structure — add new docs here and in Nav.
 */

export interface LibraryDoc {
  id: string;
  title: string;
  author?: string;
  category: "methodology" | "classics";
  file: string; // relative to content/ dir
}

export const libraryDocs: LibraryDoc[] = [
  // 智育派独家方法论
  {
    id: "fifteen-steps",
    title: "十五步排盘总纲",
    category: "methodology",
    file: "methodology/fifteen-steps.md",
  },
  {
    id: "four-schools",
    title: "四家投票法与认识论",
    category: "methodology",
    file: "methodology/four-schools.md",
  },
  // 命理传世经典
  {
    id: "yuanhai-ziping",
    title: "渊海子平",
    author: "宋·徐大升",
    category: "classics",
    file: "classics/yuanhai-ziping.md",
  },
  {
    id: "ditianshui",
    title: "滴天髓阐微",
    author: "清·任铁樵",
    category: "classics",
    file: "classics/ditianshui.md",
  },
  {
    id: "sanming-tonghui",
    title: "三命通会",
    author: "明·万民英",
    category: "classics",
    file: "classics/sanming-tonghui.md",
  },
];
