import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const result = await sql`SELECT * FROM panel WHERE id = ${id}`;
  const question = result.rows[0];
  console.log(question);
  return NextResponse.json({question}, { status: 200 });
}