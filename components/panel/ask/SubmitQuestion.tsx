"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { XCircleIcon } from "@heroicons/react/16/solid";

interface SubmitQuestionProps {
  id: string;
}

const SubmitQuestion = ({ id }: SubmitQuestionProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    const response = await fetch("/api/panel/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, question }),
    });
    if (!response.ok) {
      setError("Failed to submit question");
      setIsLoading(false);
    } else {
      setTimeout(() => {
        router.push("/panel");
      }, 2000);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
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
            disabled={isLoading}
            className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="mt-4 rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubmitQuestion;

export function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
      </div>
    </div>
  );
}
