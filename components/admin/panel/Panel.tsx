"use client";
import React from "react";
import type { Panel } from "@/types/panel";

const Panel = ({ panel }: { panel: Panel[] }) => {
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

  return (
    <>
      {panel.map((item) => (
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
