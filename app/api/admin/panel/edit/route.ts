import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, newQuestion, status } = await req.json();
  console.log(id, newQuestion, status);
  const result = await supabase.from("panel").update({ question: newQuestion, status }).eq("id", id);
  if(!result.error) {
    return NextResponse.json({message: "Question updated"}, { status: 200 });
  }
  return NextResponse.json({message: "Question not found"}, { status: 404 });
}