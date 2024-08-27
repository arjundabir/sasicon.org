import { NextRequest, NextResponse } from "next/server";
import connectToSupabase from "@/lib/connectToSupabase";

export async function POST(req: NextRequest) {
  const { id, question } = await req.json();
  const supabase = connectToSupabase();
  const result = await supabase.from("panel").insert({ user_id: id, question: question, is_approved: null });
  if(result.error){
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
  return NextResponse.json({ message: "Question submitted" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, user_id, question } = await req.json();
  const is_approved = null;
  const supabase = connectToSupabase();
  const result = await supabase.from("panel").update({ question: question, is_approved: is_approved }).eq("id", id).eq("user_id", user_id);
  return NextResponse.json({ result }, { status: 201 });
}