import RandomGenerator from "@/components/admin/raffle/RandomGenerator";
import supabase from "@/lib/supabase";
import React from "react";

const page = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, raffle_tickets");
  console.log(data);
  return <RandomGenerator allUserRaffleTickets={data} />;
};

export default page;
