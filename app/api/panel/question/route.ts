import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  const { id, question } = await req.json();
  const result = await sql`INSERT INTO panel (id, question) VALUES (${id}, ${question}) RETURNING *`;

  const newQuestion = result.rows[0]
  return NextResponse.json({ newQuestion }, { status: 200 });
}