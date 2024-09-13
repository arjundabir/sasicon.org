import React from "react";
import QuestionDashboard from "@/components/panel/QuestionDashboard";
import { Panel } from "@/types/panel";
import { cookies } from "next/headers";
import supabase from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 0;

const page = async () => {
  noStore();

  const cookieStore = cookies();
  const id = cookieStore.get("userId")?.value;
  const { data, error } = await supabase
    .from("panel")
    .select("*")
    .eq("user_id", id);
  const questions = data;
  return (
    <div className="relative h-dvh">
      <QuestionDashboard questions={questions as Panel[]} />
    </div>
  );
};

export default page;
