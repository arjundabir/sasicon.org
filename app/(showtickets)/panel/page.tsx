import React from "react";
import QuestionDashboard from "@/components/panel/QuestionDashboard";
import { sql } from "@vercel/postgres";
import { Panel } from "@/types/panel";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

const page = async () => {
  noStore();
  const cookieStore = cookies();
  const id = cookieStore.get("userId")?.value;
  const result = await sql<Panel>`SELECT * FROM panel WHERE user_id = ${id}`;
  const questions = result.rows;
  return (
    <div className="relative h-dvh">
      <QuestionDashboard questions={questions} />
    </div>
  );
};

export default page;
