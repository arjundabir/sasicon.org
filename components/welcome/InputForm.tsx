"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import { User } from "@/types/user";

const InputForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(201);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData
      .get("firstName")
      ?.toString()
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()) as string;
    const lastName = formData
      .get("lastName")
      ?.toString()
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()) as string;
    setIsLoading(true);
    const response = await fetch("/api/welcome", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName }),
    });
    const { result }: { result: User } = await response.json();
    setStatusCode(response.status);
    setUser(result);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsLoading(false);
    router.push("/");
  };
  return (
    <>
      <Alert result={user} statusCode={statusCode} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              disabled={isLoading}
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
          </div>
          <div className="mt-2">
            <input
              disabled={isLoading}
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:bg-blue-800/50"
          >
            {isLoading ? "Loading..." : "Check In"}
          </button>
        </div>
      </form>
    </>
  );
};

export default InputForm;
