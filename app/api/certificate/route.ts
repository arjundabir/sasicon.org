import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToSupabase from "@/lib/connectToSupabase";

export async function POST(request: NextRequest) {
  const { certificateType, email, country, city, region, postalCode } = await request.json();
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {

    const supabase = connectToSupabase();
    const result = await supabase.from("certificates").insert({
      user_id: userId.value,
      certificate_type: certificateType,
      email: email,
      country: country,
      city: city,
      region: region,
      postal_code: postalCode
    });
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
