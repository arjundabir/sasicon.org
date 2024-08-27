import React from "react";
import Panel from "@/components/admin/panel/active/Panel";
import supabase from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";

const Page = async () => {
  noStore();
  const { data: panelData, error } = await supabase
    .from("panel")
    .select("*")
    .eq("status", "Approved");

  if (error) {
    console.error("Error fetching panel data:", error);
    return <div>Error loading panel data</div>;
  }

  return (
    <div>
      <Panel panel={panelData} />
    </div>
  );
};

export default Page;
