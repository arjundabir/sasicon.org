import React from "react";
import { User } from "@/types/user";
import Table from "@/components/admin/Table";
import { unstable_noStore as noStore } from "next/cache";
import connectToSupabase from "@/lib/connectToSupabase";

const page = async () => {
  noStore();

  const supabase = connectToSupabase();
  const result = await supabase.from("users").select("*");
  const users = result.data as User[];

  return (
    <div className="w-dvw p-4 flex flex-col">
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 w-full h-10">
        Admin Dashboard
      </h2>
      <Table users={users} />
    </div>
  );
};

export default page;
