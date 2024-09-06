import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json();
  const user = await supabase.from("users").select("*").eq("id", id);
  return NextResponse.json(user, { status: 200 });
}