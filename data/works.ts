import supabase from "@/lib/supabase";
import { Work } from "@/types/work";

export const getWorks = async () => {
  const { data, error } = await supabase.from("works").select("*");
  if (error) {
    console.error(error);
  } else {
    return data as Work[];
  }
};