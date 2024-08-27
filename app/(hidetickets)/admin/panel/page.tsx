import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import Panel from "@/components/admin/panel/Panel";
import supabase from "@/lib/supabase";

const page = async () => {
  noStore();
  const result = await supabase.from("panel").select("*");
  const panel = result.data ? (result.data as Panel[]) : null;

  return (
    <div className="flex flex-col min-h-dvh flex-1 justify-start px-6 py-12 lg:px-8 overflow-y-auto">
      <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Admin Panel
      </h2>
      <Panel panel={panel as Panel[]} />
    </div>
  );
};

export default page;
