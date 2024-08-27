"use client";
import React, { useEffect } from "react";
import type { Panel } from "@/types/panel";
import supabase from "@/lib/supabase";

const Panel = ({ panel }: { panel: Panel[] | null }) => {
  const handleApproval = async (id: string, isApproved: boolean) => {
    const response = await fetch(`/api/admin/panel/approval`, {
      method: "POST",
      body: JSON.stringify({ id, isApproved }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Failed to update approval status");
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "panel" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    console.log(channel);

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return (
    <>
      {panel &&
        panel.map((item) => (
          <div key={item.id}>
            <p>{item.question}</p>
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleApproval(item.user_id, true)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleApproval(item.user_id, false)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Panel;
