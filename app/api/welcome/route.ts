import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { generateRandomId } from "@/lib/generateId";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName } = body;
  const userId = generateRandomId();

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("first_name", firstName)
      .eq("last_name", lastName);
    if (data && data.length > 0) {
      return NextResponse.json({ data }, { status: 200 });
    } else {
      const newUser = await supabase
        .from("users")
        .insert([{ id: userId, first_name: firstName, last_name: lastName, raffle_tickets: 1, wants_certificate: false, workshops: ["conference"], is_admin: false }])
        .select();
      if (newUser.data && newUser.data.length > 0) {
        cookies().set("userId", newUser.data[0].id);
        cookies().set("raffleTickets", newUser.data[0].raffle_tickets.toString());
        return NextResponse.json({ result: newUser.data[0] }, { status: 201 });
      } else {
        throw new Error("Failed to insert new user");
      }
    }
  } catch (error) {
    console.error("SQL ERROR", error);
    return NextResponse.json({ message: "SQL ERROR", error }, { status: 500 });
  }
}
