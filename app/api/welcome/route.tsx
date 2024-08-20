import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName } = body;

  try {
    let result: User;
    const existingUser: any = await sql`
      SELECT * FROM users 
      WHERE first_name = ${firstName} AND last_name = ${lastName}`;
    if (existingUser.rowCount === 0) {
      const newUser = await sql`
        INSERT INTO users (first_name, last_name) 
        VALUES (${firstName}, ${lastName})
        RETURNING *`;
      result = convertToUser(newUser.rows[0]);
      cookies().set("userId", result.id);
      cookies().set("raffleTickets", result.raffle_tickets.toString());
      return NextResponse.json({ result }, { status: 201 });
    } else {
      result = convertToUser(existingUser.rows[0]);
      return NextResponse.json({ result }, { status: 409 });
    }
  } catch (error) {
    console.error("SQL ERROR", error);
    return NextResponse.json({ message: "SQL ERROR", error }, { status: 500 });
  }
}

const convertToUser = (user: any) => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    raffle_tickets: user.raffle_tickets,
    wants_certificate: user.wants_certificate,
    workshops: user.workshops,
  };
};
