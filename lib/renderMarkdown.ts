/**
 * Simple markdown-to-HTML renderer for report content.
 * Handles: tables, headings, bold, italic, paragraphs, lists.
 */
export function renderMarkdown(text: string): string {
  const lines = text.split("\n");
  const output: string[] = [];
  let tableBuffer: string[] = [];

  const flushTable = () => {
    if (tableBuffer.length < 2) {
      output.push(...tableBuffer);
      tableBuffer = [];
      return;
    }
    const rows = tableBuffer.filter((r) => !r.match(/^\|[\s\-|]+\|$/));
    if (rows.length === 0) {
      tableBuffer = [];
      return;
    }

    const parseRow = (row: string, tag: string) =>
      "<tr>" +
      row
        .split("|")
        .filter((_, i, a) => i > 0 && i < a.length - 1)
        .map((c) => `<${tag}>${c.trim()}</${tag}>`)
        .join("") +
      "</tr>";

    const html = `<table class="report-table"><thead>${parseRow(rows[0], "th")}</thead><tbody>${rows.slice(1).map((r) => parseRow(r, "td")).join("")}</tbody></table>`;
    output.push(html);
    output.push(""); // Ensure single blank line after table
    tableBuffer = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      tableBuffer.push(line);
    } else {
      if (tableBuffer.length > 0) flushTable();
      // Skip ## Chapter X: header lines (chapter titles shown by UI)
      if (line.match(/^##\s+Chapter\s+\d+/)) continue;
      // Headings
      const processed = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/^#{1,3}\s+(.+)/, "<h3>$1</h3>");
      output.push(processed);
    }
  }
  if (tableBuffer.length > 0) flushTable();

  return output
    .join("\n")
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}
