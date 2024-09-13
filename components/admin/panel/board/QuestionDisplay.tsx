"use client";

import supabase from "@/lib/supabase";
import { Panel } from "@/types/panel";
import React, { useEffect, useState } from "react";

const QuestionDisplay = ({ panelQuestions }: { panelQuestions: Panel[] }) => {
  const [questions, setQuestions] = useState<Panel[]>(panelQuestions);

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
    console.log(questions);
  }, [questions]);

  return (
    <div className="h-dvh w-dvw bg-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold ">Question:</h1>
      {questions.map((question, index) =>
        question.status === "Approved" ? (
          <p className="text-7xl font-bold" key={question.id}>
            {question.question}: {question.id.slice(0, 5)}
          </p>
        ) : (
          <div key={question.id}>
            <p className="text-base text-red-400">No questions to display.</p>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionDisplay;
