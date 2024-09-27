"use client";
import React, { useEffect, useState } from "react";
import type { Panel } from "@/types/panel";
import supabase from "@/lib/supabase";
import AskedQuestionAlert from "./active/AskedQuestionAlert";
import useReloadWhenOnline from "@/utils/reload-when-online";
import RejectModal from "./RejectButton";

const Panel = ({ panel }: { panel: Panel[] | null }) => {
  const [dynamicPanel, setDynamicPanel] = useState<Panel[]>(panel || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const handleApproval = async (
    id: string,
    status: Panel["status"],
    message: string
  ) => {
    const response = await fetch(`/api/admin/panel/approval`, {
      method: "POST",
      body: JSON.stringify({ id, status, message: message || null }),
    });
    if (response.ok) {
      const data = await response.json();
      // Update the dynamicPanel state based on the response
    } else {
      console.log("Failed to update approval status");
    }
  };

  const openRejectModal = (id: string) => {
    setRejectingId(id);
    setIsRejectModalOpen(true);
  };

  const handleReject = (reason: string) => {
    if (rejectingId) {
      handleApproval(rejectingId, "Rejected", reason);
      setRejectingId(null);
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

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  useReloadWhenOnline();

  const inQueueCount =
    dynamicPanel?.filter((item) => item.status === "Queued").length || 0;

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          In Queue: <span className="text-blue-500">{inQueueCount}</span>
        </h2>
        <div>
          {dynamicPanel && dynamicPanel.length > 0 ? (
            dynamicPanel.map((item, index) =>
              item.status === "Queued" ? (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 border rounded-lg p-2"
                >
                  <p className="text-sm text-gray-500">{item.id.slice(0, 5)}</p>
                  <p className="text-xl font-bold text-black">
                    <span className="text-black font-medium text-sm">
                      Question:{" "}
                    </span>
                    {item.question}
                  </p>

                  <AskedQuestionAlert id={item.id} />
                </div>
              ) : null
            )
          ) : (
            <div>No questions in queue.</div>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Approved:
        </h2>
        <div>
          {dynamicPanel && dynamicPanel.length > 0 ? (
            dynamicPanel.map((item, index) =>
              item.status === "Approved" ? (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 border rounded-lg p-2"
                >
                  <p className="text-sm text-gray-500">{item.id.slice(0, 5)}</p>
                  <p className="text-xl font-bold text-black">
                    <span className="text-black font-medium text-sm">
                      Question:{" "}
                    </span>
                    {item.question}
                  </p>

                  <AskedQuestionAlert id={item.id} />
                </div>
              ) : null
            )
          ) : (
            <div>No questions approved.</div>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Questions:
      </h2>
      <div className="space-y-4">
        <h3 className="text-xl font-bold leading-9 tracking-tight text-gray-900">
          Pending:
        </h3>
        {dynamicPanel &&
          dynamicPanel
            .filter(
              (item) =>
                item.status !== "Rejected" &&
                item.status !== "Asked" &&
                item.status !== "Approved"
            )
            .map((item) => {
              const disabled =
                item.status === "Approved" || item.status === "Rejected";
              const modified = item.status === "Modified";
              return (
                <div
                  key={item.id}
                  className={
                    "flex flex-col gap-2 " + (modified ? " text-blue-800" : "")
                  }
                >
                  {!disabled && !modified && editingId === item.id ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => handleEdit(String(item.id), editText)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          handleEdit(String(item.id), editText);
                      }}
                      className="border border-gray-300 rounded-md w-full p-2 text-lg"
                    />
                  ) : (
                    <p
                      onDoubleClick={() => {
                        setEditingId(String(item.id));
                        setEditText(item.question);
                      }}
                      className="border border-gray-300 rounded-md p-2 text-lg"
                    >
                      {item.question}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-md disabled:opacity-50"
                      disabled={disabled}
                      onClick={() => handleApproval(item.id, "Approved", "")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md disabled:opacity-50"
                      onClick={() => openRejectModal(item.id)}
                      disabled={disabled}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md disabled:opacity-50"
                      onClick={() => {
                        setEditingId(String(item.id));
                        setEditText(item.question);
                      }}
                      disabled={disabled}
                    >
                      Modify
                    </button>
                  </div>
                </div>
              );
            })}
        <div>
          <h3 className="text-xl font-bold leading-9 tracking-tight text-gray-900">
            Rejected:
          </h3>
          {dynamicPanel &&
            dynamicPanel
              .filter((item) => item.status === "Rejected")
              .map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <p className="border border-gray-300 rounded-md p-2 text-lg">
                    {item.question}
                    <br />
                    <span className="text-sm text-gray-500">
                      Reason: {item.message}
                    </span>
                  </p>
                </div>
              ))}
        </div>
        <div>
          <h3 className="text-xl font-bold leading-9 tracking-tight text-gray-900">
            Asked:
          </h3>
          {dynamicPanel &&
            dynamicPanel
              .filter((item) => item.status === "Asked")
              .map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className="border border-gray-300 rounded-md p-2 text-lg flex flex-col">
                    <span className="text-sm text-gray-500">
                      {item.id.slice(0, 5)}
                    </span>
                    {item.question}
                  </div>
                </div>
              ))}
        </div>
      </div>
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleReject}
      />
    </div>
  );
};

export default Panel;
