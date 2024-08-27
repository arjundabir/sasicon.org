import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const result = await supabase.from("panel").delete().eq("id", id);
  return NextResponse.json(result, { status: 200 });
}