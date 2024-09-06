import { cookies } from "next/headers";

export default function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  return userId;
}