import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import Panel from "@/components/admin/panel/Panel";
import connectToSupabase from "@/lib/connectToSupabase";

const page = async () => {
  noStore();
  const supabase = connectToSupabase();

  const result = await supabase
    .from("panel")
    .select("*")
    .eq("is_approved", null);
  const panel = result.data ? (result.data[0] as Panel[]) : null;

  return (
    <div className="flex flex-col min-h-dvh flex-1 justify-start px-6 py-12 lg:px-8 overflow-y-auto">
      <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Admin Panel
      </h2>
      <Panel panel={panel} />
    </div>
  );
};

export default page;
