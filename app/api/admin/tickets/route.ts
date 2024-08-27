import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/types/user";

export async function POST(request: NextRequest) {
  const { id, tickets } : {id: string, tickets: string} = await request.json();
  const result = await sql`SELECT raffle_tickets FROM users WHERE id = ${id}`;
  const user = result.rows[0] as User;
  const currentTickets = Number(user.raffle_tickets);
  const newTickets = currentTickets + Number(tickets);
  try {
    await sql`UPDATE users SET raffle_tickets = ${newTickets} WHERE id = ${id}`;
    return NextResponse.json({ message: "Tickets added " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding tickets" }, { status: 500 });
  }
}