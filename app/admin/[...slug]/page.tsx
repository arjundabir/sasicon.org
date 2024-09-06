import React from "react";
import { User } from "@/types/user";
import AdminStatus from "@/components/admin/AdminStatus";
import AddTickets from "@/components/admin/AddTickets";
import supabase from "@/lib/supabase";

interface PageProps {
  params: {
    slug: string[];
  };
}

const page = async ({ params }: PageProps) => {
  const user_id = params.slug[0];

  const result = await supabase.from("users").select("*").eq("id", user_id);

  const user = result.data ? (result.data[0] as User) : null;
  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      {user && (
        <ul className="space-y-2">
          <li>
            <strong>ID:</strong> {user.id}
          </li>
          <li>
            <strong>First Name:</strong> {user.first_name}
          </li>
          <li>
            <strong>Last Name:</strong> {user.last_name}
          </li>
          <li>
            <strong>Raffle Tickets:</strong>{" "}
            <AddTickets
              id={user.id}
              firstName={user.first_name}
              raffle_tickets={user.raffle_tickets}
            />
          </li>
          <li>
            <strong>Wants Certificate:</strong>{" "}
            {user.wants_certificate ? "Yes" : "No"}
          </li>
          <li>
            <strong>Workshops:</strong> {user.workshops.join(", ")}
          </li>
          <li>
            <strong>Is Admin:</strong> <AdminStatus user={user} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default page;
