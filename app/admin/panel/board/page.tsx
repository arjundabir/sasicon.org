import QuestionDisplay from "@/components/admin/panel/board/QuestionDisplay";
import supabase from "@/lib/supabase";
import { Panel } from "@/types/panel";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 0;

const page = async () => {
  noStore();

  const { data, error } = await supabase.from("panel").select("*");
  return <QuestionDisplay panelQuestions={data as Panel[]} />;
};

export default page;
