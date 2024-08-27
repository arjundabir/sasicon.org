import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  noStore();

  const { id, isApproved } = await req.json();
  const result = await supabase.from("panel").update({ is_approved: isApproved }).eq("id", id);
  return NextResponse.json(result, { status: 200 });
}