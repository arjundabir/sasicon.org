import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import supabase from "@/lib/supabase";

export async function POST(req: NextRequest) {
  noStore();

  const { id, status, message } = await req.json();
  console.log(id, status, message);
  const result = await supabase
    .from("panel")
    .update({ status, message })
    .eq("id", id);
  return NextResponse.json(result, { status: 200 });
}