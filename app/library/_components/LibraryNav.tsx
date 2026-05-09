"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { libraryDocs } from "@/lib/library-registry";

const categories = [
  {
    key: "methodology" as const,
    label: "智育派独家方法论",
  },
  {
    key: "classics" as const,
    label: "命理传世经典",
  },
];

export default function LibraryNav() {
  const params = useParams();
  const currentId = (params?.slug as string[])?.join("/") ?? "";
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="lib-sidebar">
        <Link href="/library" className="lib-sidebar-logo">
          典籍文库
        </Link>
        <nav className="lib-nav-list">
          {categories.map((cat) => {
            const docs = libraryDocs.filter((d) => d.category === cat.key);
            return (
              <div key={cat.key} className="lib-nav-group">
                <p className="lib-nav-group-label">{cat.label}</p>
                <ul className="lib-nav-sub">
                  {docs.map((doc) => {
                    const isActive = doc.id === currentId;
                    return (
                      <li key={doc.id}>
                        <Link
                          href={`/library/${doc.id}`}
                          className={`lib-nav-sub-item ${isActive ? "active" : ""}`}
                        >
                          {doc.title}
                          {doc.author && (
                            <span className="lib-nav-author">{doc.author}</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile toggle */}
      <button
        className="lib-sidebar-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lib-sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`lib-sidebar lib-sidebar-mobile ${open ? "open" : ""}`}>
        <Link href="/library" className="lib-sidebar-logo" onClick={() => setOpen(false)}>
          典籍文库
        </Link>
        <nav className="lib-nav-list">
          {categories.map((cat) => {
            const docs = libraryDocs.filter((d) => d.category === cat.key);
            return (
              <div key={cat.key} className="lib-nav-group">
                <p className="lib-nav-group-label">{cat.label}</p>
                <ul className="lib-nav-sub">
                  {docs.map((doc) => {
                    const isActive = doc.id === currentId;
                    return (
                      <li key={doc.id}>
                        <Link
                          href={`/library/${doc.id}`}
                          className={`lib-nav-sub-item ${isActive ? "active" : ""}`}
                          onClick={() => setOpen(false)}
                        >
                          {doc.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
