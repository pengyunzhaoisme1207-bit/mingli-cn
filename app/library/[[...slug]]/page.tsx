import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import LibraryNav from "../_components/LibraryNav";
import fs from "fs";
import path from "path";
import { libraryDocs } from "@/lib/library-registry";
import Link from "next/link";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

const CONTENT_DIR = path.join(process.cwd(), "app", "library", "content");

const categories = [
  {
    key: "methodology" as const,
    label: "智育派独家方法论",
    icon: "📏",
  },
  {
    key: "classics" as const,
    label: "命理传世经典",
    icon: "📜",
  },
];

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["fifteen-steps"] },
    { slug: ["four-schools"] },
    { slug: ["yuanhai-ziping"] },
    { slug: ["ditianshui"] },
    { slug: ["sanming-tonghui"] },
  ];
}

function LibraryIndex() {
  return (
    <section className="library-index" style={{ paddingTop: "8rem" }}>
      <div className="container">
        <div className="library-header">
          <p className="section-label">典籍文库</p>
          <h1 className="section-title">命理知识宝库</h1>
          <p className="section-desc">
            从十五步排盘方法论到传世经典原典，
            系统了解中华传统命理学的理论体系与实践方法。
          </p>
        </div>

        {categories.map((cat) => {
          const docs = libraryDocs.filter((d) => d.category === cat.key);
          return (
            <div key={cat.key} className="library-category">
              <h2 className="category-title">
                <span className="category-icon">{cat.icon}</span>
                {cat.label}
              </h2>
              <div className="doc-list">
                {docs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/library/${doc.id}`}
                    className="doc-card"
                  >
                    <div className="doc-card-inner">
                      <h3 className="doc-title">{doc.title}</h3>
                      {doc.author && (
                        <p className="doc-author">{doc.author}</p>
                      )}
                      <span className="doc-arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default async function LibraryPage({ params }: Props) {
  const { slug } = await params;

  // No slug = index page
  if (!slug || slug.length === 0) {
    return <LibraryIndex />;
  }

  const id = slug.join("/");
  const doc = libraryDocs.find((d) => d.id === id);
  if (!doc) notFound();

  let content: string | null = null;
  try {
    content = fs.readFileSync(path.join(CONTENT_DIR, doc.file), "utf-8");
  } catch {
    notFound();
  }

  return (
    <>
      <LibraryNav />
      <section className="library-doc" style={{ paddingTop: "8rem" }}>
        <div className="library-doc-container">
          <div className="library-doc-content">
            <div className="library-doc-header">
              <p className="doc-category-label">
                {doc.category === "methodology"
                  ? "智育派独家方法论"
                  : "命理传世经典"}
              </p>
              <h1 className="doc-title">{doc.title}</h1>
              {doc.author && (
                <p className="doc-author-line">{doc.author}</p>
              )}
            </div>

            <div className="md-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
