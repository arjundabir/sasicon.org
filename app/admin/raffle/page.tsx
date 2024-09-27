import RandomGenerator from "@/components/admin/raffle/RandomGenerator";
import supabase from "@/lib/supabase";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

const page = async () => {
  noStore();

  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, raffle_tickets");
  console.log(data);
  return <RandomGenerator allUserRaffleTickets={data} />;
};

export default page;
