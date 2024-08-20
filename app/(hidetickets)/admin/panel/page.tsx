import React from "react";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import Panel from "@/components/admin/panel/Panel";

const page = async () => {
  noStore();

  const result = await sql`SELECT * FROM panel WHERE is_approved IS NULL`;
  const panel = result.rows as Panel[];

  return (
    <div className="flex flex-col min-h-dvh flex-1 justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Admin Panel
      </h2>
      <Panel panel={panel} />
    </div>
  );
};

export default page;
