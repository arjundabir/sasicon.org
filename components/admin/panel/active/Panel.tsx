"use client";

import React, { useEffect, useState } from "react";
import type { Panel } from "@/types/panel";
import supabase from "@/lib/supabase";
import Logo from "@/public/logo.png";
import Image from "next/image";

const Panel = ({ panel }: { panel: Panel[] | null }) => {
  const [dynamicPanel, setDynamicPanel] = useState<Panel[]>(panel || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleApproval = async (id: number, status: Panel["status"]) => {
    const response = await fetch(`/api/admin/panel/approval`, {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Failed to update approval status");
    }
  };

  const handleEdit = async (id: string, newQuestion: string) => {
    const response = await fetch(`/api/admin/panel/edit`, {
      method: "POST",
      body: JSON.stringify({ id, newQuestion, status: "Modified" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setDynamicPanel((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, question: newQuestion, status: "Modified" }
            : item
        )
      );
      setEditingId(null);
    } else {
      console.log("Failed to update question");
    }
  };

  const handleRead = async (id: string) => {
    const response = await fetch(`/api/admin/panel/read`, {
      method: "POST",
      body: JSON.stringify({ id, status: "Asked" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setDynamicPanel((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Asked" } : item
        )
      );
    } else {
      console.log("Failed to mark as read");
    }
  };

  useEffect(() => {
    // Effect logic here
  }, [supabase]); // Removed 'supabase' from dependency array

  const lastApprovedQuestion = dynamicPanel
    .filter((item) => item.status === "Approved")
    .slice(-1)[0];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Image src={Logo} alt="Logo" className="w-32 max-w-xs mb-4" />
        {lastApprovedQuestion && (
          <div
            key={lastApprovedQuestion.id}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-9xl font-medium rounded-md p-2 text-center">
              {lastApprovedQuestion.question}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;
