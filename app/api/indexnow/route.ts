import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const urls = Array.isArray(payload?.urls)
      ? payload.urls.filter((u: unknown): u is string => typeof u === "string")
      : [];

    if (!urls.length) {
      return NextResponse.json({ success: false, error: "No urls provided" }, { status: 400 });
    }

    const result = await submitToIndexNow(urls);
    return NextResponse.json({ success: !!result.ok, result }, { status: result.ok ? 200 : 502 });
  } catch (err) {
    console.error("IndexNow API route error:", err);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
