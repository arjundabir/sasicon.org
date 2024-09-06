import supabase from "./supabase";

export default async function getUser(id: string) {
  const user = await supabase.from("users").select("*").eq("id", id);
  return user;
}