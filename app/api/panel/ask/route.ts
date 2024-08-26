import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Panel } from "@/types/panel";

export async function POST(req: NextRequest) {
  const { id, question } = await req.json();
  const result = await sql`INSERT INTO panel (user_id, question) VALUES (${id}, ${question}) RETURNING *`;

  const newQuestion = result.rows[0]
  return NextResponse.json({ newQuestion }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, user_id, question } = await req.json();
  const is_approved = null;
  const result = await sql`UPDATE panel SET question=${question}, is_approved=${is_approved} WHERE id=${id} AND user_id=${user_id} RE`;
  return NextResponse.json({ result }, { status: 201 });
}