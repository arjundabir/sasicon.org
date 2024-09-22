import getUserId from "@/lib/get-userid";
import supabase from "@/lib/supabase";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id: voteId } = await req.json();

  const userId = await getUserId();

  if (!userId) return new Response(JSON.stringify({ error: "User not found" }), {status: 404,});

  const { data, error } = await supabase
    .from("users")
    .update({ vote: voteId })
    .eq("id", userId)
    .select("vote");

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(JSON.stringify({ vote: data[0].vote }), {
      status: 200,
    }); 
  }
}
