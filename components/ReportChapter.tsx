"use client";

import { useState, useRef, useEffect } from "react";

interface ReportChapterProps {
  chapterNum: number;
  title: string;
  content: string;
  locked?: boolean;
}

export default function ReportChapter({
  chapterNum,
  title,
  content,
  locked = false,
}: ReportChapterProps) {
  return (
    <div className={`chapter ${locked ? "chapter-locked" : ""}`}>
      <div className="chapter-content">
        <p className="chapter-label">Chapter {chapterNum}</p>
        <h2 className="chapter-title">{title}</h2>
        <div
          className="chapter-body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>
      {locked && <div className="chapter-overlay" />}
    </div>
  );
}

function renderMarkdown(text: string): string {
  if (!text) return "<p><em>Content unavailable.</em></p>";

  let html = text;

  // Escape HTML
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)*)/gm,
    (match, headerRow, sepRow, bodyRows) => {
      const parseRow = (row: string) =>
        row.split("|").filter((c: string) => c.trim()).map((c: string) => c.trim());
      const headers = parseRow(headerRow);
      const rows = bodyRows.trim().split("\n").map(parseRow);

      let table = "<table><thead><tr>";
      headers.forEach((h: string) => { table += `<th>${h}</th>`; });
      table += "</tr></thead><tbody>";
      rows.forEach((row: string[]) => {
        table += "<tr>";
        row.forEach((cell) => { table += `<td>${cell}</td>`; });
        table += "</tr>";
      });
      table += "</tbody></table>";
      return table;
    }
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, '<h2 class="chapter-title">$1</h2>');

  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Paragraphs
  html = html.replace(/^(?!<[huplt]|<\/)(.+)$/gm, "<p>$1</p>");
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
}
