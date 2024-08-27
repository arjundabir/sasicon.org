import React from "react";
import { sql } from "@vercel/postgres";
import { User } from "@/types/user";
import Table from "@/components/admin/Table";
import { unstable_noStore as noStore } from "next/cache";

const page = async () => {
  noStore();

  const result = await sql`SELECT * FROM users`;
  const users = result.rows as User[];
  return (
    <div className="flex flex-col min-h-dvh flex-1 justify-center px-6 lg:px-8">
      <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Admin Dashboard
      </h2>
      <Table users={users} />
    </div>
  );
};

export default page;
