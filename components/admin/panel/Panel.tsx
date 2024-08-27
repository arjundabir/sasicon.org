"use client";
import React, { useEffect, useState } from "react";
import type { Panel } from "@/types/panel";
import supabase from "@/lib/supabase";

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
          item.id === Number(id)
            ? { ...item, question: newQuestion, status: "Modified" }
            : item
        )
      );
      setEditingId(null);
    } else {
      console.log("Failed to update question");
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
          if (payload.eventType === "INSERT") {
            setDynamicPanel((prev) => [...prev, payload.new as Panel]);
          } else if (payload.eventType === "UPDATE") {
            setDynamicPanel((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as Panel) : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            setDynamicPanel((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
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
      {dynamicPanel &&
        dynamicPanel.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            {editingId === String(item.id) ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleEdit(String(item.id), editText)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEdit(String(item.id), editText);
                }}
                className="border border-gray-300 rounded-md w-full p-2"
              />
            ) : (
              <p
                onDoubleClick={() => {
                  setEditingId(String(item.id));
                  setEditText(item.question);
                }}
                className="border border-gray-300 rounded-md p-2"
              >
                {item.question}
              </p>
            )}
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleApproval(item.id, "Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleApproval(item.id, "Rejected")}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={() => {
                  setEditingId(String(item.id));
                  setEditText(item.question);
                }}
              >
                Modify
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Panel;
