"use client";
import React, { useState, useEffect } from "react";

interface SubmitQuestionProps {
  id: string;
}

const SubmitQuestion = ({ id }: SubmitQuestionProps) => {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    const response = await fetch("/api/panel/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, question }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit question");
    }
    const { newQuestion } = await response.json();
    setQuestion(newQuestion.question);

    // Start polling for approval status
    pollApprovalStatus(newQuestion.id);
  };

  const pollApprovalStatus = async (questionId: string) => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/panel/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const { question } = await response.json();
        console.log(question);
        if (question.is_approved !== null) {
          setIsApproved(question.is_approved);
          setIsLoading(false);
          clearInterval(interval);
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  useEffect(() => {
    console.log(isApproved);
  }, [isApproved]);

  return isLoading ? (
    <div className="absolute inset-0 h-dvh w-dvw bg-white flex justify-center items-center">
      <p>Question: {question}</p>
      <div>Loading...</div>
    </div>
  ) : isApproved !== null ? (
    isApproved === true ? (
      <div className="absolute inset-0 h-dvh w-dvw bg-green-500 flex justify-center items-center">
        <p>Your question has been approved!</p>
      </div>
    ) : (
      <div className="absolute inset-0 h-dvh w-dvw bg-red-500 flex justify-center items-center">
        <p>Your question was not approved.</p>
      </div>
    )
  ) : (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Question
        </label>
        <div className="mt-2">
          <textarea
            name="question"
            id="question"
            className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubmitQuestion;
