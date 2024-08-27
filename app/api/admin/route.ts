import connectToSupabase from "@/lib/connectToSupabase";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { user_id, isAdmin } = await req.json();
  const supabase = connectToSupabase();
  const response = await supabase.from("users").update({ is_admin: isAdmin }).eq("id", user_id);
  return NextResponse.json({response}, {status:201});
}