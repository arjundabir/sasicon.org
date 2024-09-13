import { cookies } from "next/headers";

let cachedUserId: string | null = null;

export default function getUserId() {
  if (cachedUserId) {
    return cachedUserId;
  }

  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  cachedUserId = userId?.value || null;
  return userId?.value || null;
}