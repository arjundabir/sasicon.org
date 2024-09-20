import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { isAdmin, data } = await request.json();

  if (isAdmin) {
    cookies().set("userId", data.id);
    return NextResponse.json({ message: "Admin verified" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Admin verification failed" }, { status: 403 });
  }
}
