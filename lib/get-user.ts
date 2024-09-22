import { User } from "@/types/user";
import supabase from "./supabase";

export default async function getUser(id: string): Promise<User | undefined> {
  const user = await supabase.from("users").select("*").eq("id", id);
  return user.data?.[0] as User | undefined;
}