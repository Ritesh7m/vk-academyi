import { promises as fs } from "fs";
import path from "path";
import { NextRequest } from "next/server";

const DATA_FILE = path.join(process.cwd(), "data", "cms.json");

async function readCMS() {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return { announcements: [], weeklyQuiz: { active: false } };
  }
}

export async function GET() {
  const data = await readCMS();
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), "utf-8");
    return Response.json({ success: true });
  } catch (err) {
    console.error("CMS write error:", err);
    return Response.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
