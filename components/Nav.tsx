"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/what-is-bazi", label: "What is Bazi" },
  { href: "/cases", label: "Famous Cases" },
  { href: "/sample-report", label: "Sample Report" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [myReportId, setMyReportId] = useState<string | null>(null);

  useEffect(() => {
    // Find the most recent report in localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith("report_")) {
        const id = key.replace("report_", "");
        setMyReportId(id);
        return;
      }
    }
  }, []);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo">
          MÍNG LÌ
        </Link>

        {/* Desktop links */}
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? "nav-active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {myReportId && (
            <li>
              <Link
                href={`/report/${myReportId}`}
                className={pathname?.startsWith("/report") ? "nav-active" : ""}
                onClick={() => setOpen(false)}
              >
                My Report
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/reading"
              className="btn btn-gold nav-cta"
              onClick={() => setOpen(false)}
            >
              Get my reading
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
