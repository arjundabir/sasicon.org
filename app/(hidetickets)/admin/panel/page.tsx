import React from "react";
import { sql } from "@vercel/postgres";
import { Panel } from "@/types/panel";

const page = async () => {
  const result = await sql`SELECT * FROM panel`;
  const panel = result.rows;

  return <div>page</div>;
};

export default page;
