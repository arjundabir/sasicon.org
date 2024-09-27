"use client";

import supabase from "@/lib/supabase";
import { Panel } from "@/types/panel";
import React, { useEffect, useState } from "react";

interface CodeorQuestionProps {
  data: Panel;
}

const CodeorQuestion = ({ data }: CodeorQuestionProps) => {
  const [question, setQuestion] = useState<Panel>(data);

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "panel" },
        (payload) => {
          console.log("Change received!", payload);
          setQuestion(payload.new as Panel);
          if ((payload.new as Panel).status === "Asked") {
            window.location.href = `/panel`;
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [supabase]);

  return (
    <div>
      {question.status === "Queued" ? (
        <p className="text-center text-3xl font-bold">{question.question}</p>
      ) : (
        <h1 className="text-[#1421a6] text-[30dvw] font-bold">
          {question.id.slice(0, 5)}
        </h1>
      )}
    </div>
  );
};

export default CodeorQuestion;
