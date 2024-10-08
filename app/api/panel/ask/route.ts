import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, question } = await req.json();
  const result = await supabase.from("panel").insert({ user_id: id, question: question, status: "Pending" });
  if(result.error){
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
  return NextResponse.json({ message: "Question submitted" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, user_id, question, status } = await req.json();
  const result = await supabase.from("panel").update({ question: question, status }).eq("id", id).eq("user_id", user_id);
  return NextResponse.json({ result }, { status: 201 });
}