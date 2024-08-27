import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateRandomId } from "@/lib/generateId";
import supabase from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName } = body;
  const userId = generateRandomId();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("first_name", firstName)
      .eq("last_name", lastName);

    let user = data && data.length > 0 ? data[0] : null;

    if (!user) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ id: userId, first_name: firstName, last_name: lastName, raffle_tickets: 1, wants_certificate: false, workshops: ["conference"], is_admin: false }])
        .select();
      
      if (insertError || !newUser || newUser.length === 0) {
        throw new Error("Failed to insert new user");
      }
      user = newUser[0];
    }

    cookies().set("userId", user.id);
    cookies().set("raffleTickets", user.raffle_tickets.toString());
    return NextResponse.json({ data: user }, { status: user ? 200 : 201 });

  } catch (error) {
    console.error("SQL ERROR", error);
    return NextResponse.json({ message: "SQL ERROR", error }, { status: 500 });
  }
}
