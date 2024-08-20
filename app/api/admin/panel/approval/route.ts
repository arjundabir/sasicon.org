import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  const { id, isApproved } = await req.json();
  const result = await sql`UPDATE panel SET is_approved = ${isApproved} WHERE id = ${id}`;
  return NextResponse.json(result, { status: 200 });
}