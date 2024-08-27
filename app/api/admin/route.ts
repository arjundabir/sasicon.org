import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PUT(req: NextRequest) {
  const { user_id, isAdmin } = await req.json();
  console.log(user_id, isAdmin);
  const response = await sql`UPDATE users SET is_admin = ${isAdmin} WHERE id = ${user_id}`;
  return NextResponse.json({response}, {status:201});
}