import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/user";
import {cookies} from "next/headers";
import supabase from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

  const { id, tickets } : {id: string, tickets: string} = await request.json();
  const result = await supabase.from("users").select("raffle_tickets").eq("id", id);
  if(result.data) {
    const user = result.data[0] as User;
    const currentTickets = Number(user.raffle_tickets);
    const newTickets = currentTickets + Number(tickets);
    cookieStore.set("raffleTickets", newTickets.toString());
    try {
      await supabase.from("users").update({ raffle_tickets: newTickets }).eq("id", id);
    return NextResponse.json({ message: "Tickets added " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding tickets" }, { status: 500 });
  }
  }
}