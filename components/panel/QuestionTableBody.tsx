"use client";
import React, { useEffect, useState } from "react";
import { Panel } from "@/types/panel";
import supabase from "@/lib/supabase";

const QuestionTableBody = ({
  initialQuestions,
}: {
  initialQuestions: Panel[];
}) => {
  const [questions, setQuestions] = useState<Panel[]>(initialQuestions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEdit = async (id: string, newQuestion: string) => {
    const response = await fetch(`/api/admin/panel/edit`, {
      method: "POST",
      body: JSON.stringify({ id, newQuestion, status: "Pending" }),
      headers: {
        "Content-Type": "application/json", // Added header
      },
    });
    if (response.ok) {
      const data = await response.json();
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === Number(id)
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
      setQuestions((prev) => prev.filter((item) => item.id !== Number(id)));
    } else {
      console.log("Failed to delete question");
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
            setQuestions((prev) => [...prev, payload.new as Panel]);
          } else if (payload.eventType === "UPDATE") {
            setQuestions((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as Panel) : item
              )
            );
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

  return (
    <tbody className="divide-y divide-gray-200">
      {questions.map((question) => (
        <tr key={question.id}>
          <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            {editingId === String(question.id) ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleEdit(String(question.id), editText)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleEdit(String(question.id), editText);
                }}
                className="border rounded-md w-full p-2 border-blue-500 focus:outline-none"
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <p
                onDoubleClick={() => {
                  setEditingId(String(question.id));
                  setEditText(question.question);
                }}
                className="border border-gray-300 rounded-md p-2"
              >
                {question.question}
              </p>
            )}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {question.status}
          </td>
          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={() => {
                setEditingId(String(question.id));
                setEditText(question.question);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
              onClick={() => handleDelete(String(question.id))}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default QuestionTableBody;
