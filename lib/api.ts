const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://web-production-6e525.up.railway.app";

export interface BirthInfo {
  name: string;
  birth_date: string;
  birth_time: string;
  birth_place: string;
  gender: string;
}

export interface ReportData {
  pillars: Record<string, { stem: string; branch: string }>;
  chapters: Record<string, string>;
}

/**
 * Submit birth info and receive a streaming report via SSE.
 * Returns a ReadableStream reader for incremental chunks.
 */
export async function streamReport(
  info: BirthInfo
): Promise<ReadableStreamDefaultReader<Uint8Array>> {
  const res = await fetch(`${API_BASE}/generate-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.detail || `Server returned ${res.status}`);
  }

  const reader = res.body!.getReader();
  return reader;
}
