import { NextRequest, NextResponse } from "next/server";
import connectToSupabase from "@/lib/connectToSupabase";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const supabase = connectToSupabase();
  const result = await supabase.from("panel").select("*").eq("id", id);
  if(result.data) {
    const question = result.data[0];
    return NextResponse.json({question}, { status: 200 });
  }
  return NextResponse.json({message: "Question not found"}, { status: 404 });
}