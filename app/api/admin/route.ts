import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { user_id, isAdmin } = await req.json();
  const response = await supabase.from("users").update({ is_admin: isAdmin }).eq("id", user_id);
  return NextResponse.json({response}, {status:201});
}