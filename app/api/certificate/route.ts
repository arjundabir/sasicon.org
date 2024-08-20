import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  const { certificateType, email, country, city, region, postalCode } = await request.json();
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    
  const result = await sql`
    INSERT INTO certificates (user_id, certificate_type, email, country, city, region, postal_code)
    VALUES (${userId?.value}, ${certificateType}, ${email}, ${country}, ${city}, ${region}, ${postalCode})
  `;
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
