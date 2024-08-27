import { NextRequest, NextResponse } from "next/server";
import connectToSupabase from "@/lib/connectToSupabase";
import { unstable_noStore as noStore } from "next/cache";

export async function POST(req: NextRequest) {
  noStore();

  const { id, isApproved } = await req.json();
  const supabase = connectToSupabase();
  const result = await supabase.from("panel").update({ is_approved: isApproved }).eq("id", id);
  return NextResponse.json(result, { status: 200 });
}