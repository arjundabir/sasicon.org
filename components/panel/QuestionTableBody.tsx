"use client";
import React, { useEffect, useState } from "react";
import { Panel } from "@/types/panel";
import supabase from "@/lib/supabase";
import QuestionCard from "./QuestionCard";
import useReloadWhenOnline from "@/utils/reload-when-online";

const QuestionTableBody = ({
  initialQuestions,
}: {
  initialQuestions: Panel[];
}) => {
  const [questions, setQuestions] = useState<Panel[]>(initialQuestions);
  const [approvedQuestions, setApprovedQuestions] = useState<Panel[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEdit = async (id: string, newQuestion: string) => {
    const response = await fetch(`/api/admin/panel/edit`, {
      method: "POST",
      body: JSON.stringify({ id, newQuestion, status: "Pending" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, question: newQuestion, status: "Pending" }
            : item
        )
      );
      setEditingId(null);
    } else {
      console.log("Failed to update question");
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/panel/delete`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setQuestions((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.log("Failed to delete question");
    }
  };

  const handleApprove = async (id: string) => {
    const response = await fetch(`/api/admin/panel/approval`, {
      method: "POST",
      body: JSON.stringify({ id, status: "Approved" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "panel" },
        async (payload) => {
          console.log("Change received!", payload);
          if (payload.eventType === "INSERT") {
            setQuestions((prev) => [...prev, payload.new as Panel]);
          } else if (payload.eventType === "UPDATE") {
            setQuestions((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as Panel) : item
              )
            );
            if (payload.new.status === "Approved") {
              const response = await fetch(`/api/admin/tickets`, {
                method: "POST",
                body: JSON.stringify({ id: payload.new.user_id, tickets: 1 }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (response.ok) {
                console.log("Tickets added successfully");
              }
            }
          } else if (payload.eventType === "DELETE") {
            setQuestions((prev) =>
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

  useEffect(() => {
    const approvedQuestions = questions.filter(
      (question) => question.status === "Approved"
    );
    setApprovedQuestions(approvedQuestions);
  }, [questions]);

  useReloadWhenOnline();

  return (
    <div className="w-full flex flex-col">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          {...question}
          index={index}
          isEditing={editingId === String(question.id)}
          editText={editText}
          onEdit={() => {
            setEditingId(String(question.id));
            setEditText(question.question);
          }}
          onDelete={() => handleDelete(String(question.id))}
          onSave={(newText) => handleEdit(String(question.id), newText)}
          onEditTextChange={(text) => setEditText(text)}
          onApprove={() => handleApprove(String(question.id))}
          queuePosition={approvedQuestions.indexOf(question) + 1 || null}
          message={question.message}
        />
      ))}
    </div>
  );
};

export default QuestionTableBody;
