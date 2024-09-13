"use client";

import supabase from "@/lib/supabase";
import { Panel } from "@/types/panel";
import useReloadWhenOnline from "@/utils/reload-when-online";
import React, { useEffect, useState } from "react";

const QuestionDisplay = ({ panelQuestions }: { panelQuestions: Panel[] }) => {
  const [questions, setQuestions] = useState<Panel[]>(panelQuestions);
  const [approvedQuestion, setApprovedQuestion] = useState<Panel[]>(
    questions.filter((question) => question.status === "Approved")
  );

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

  useEffect(() => {
    setApprovedQuestion(
      questions.filter((question) => question.status === "Approved")
    );
  }, [questions]);

  useReloadWhenOnline();

  return (
    <div className="h-dvh w-dvw bg-white flex flex-col justify-center items-center">
      <h1 className="text-lg ">Question: {questions?.[0]?.id.slice(0, 5)}</h1>
      {approvedQuestion.slice(0, 1).map((question) => (
        <p className="text-7xl font-bold" key={question.id}>
          {question.question}
        </p>
      ))}
    </div>
  );
};

export default QuestionDisplay;
