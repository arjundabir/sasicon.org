"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import { User } from "@/types/user";
import AdminVerify from "./AdminVerify";

const InputForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [adminVerify, setAdminVerify] = useState(false);

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
    const email = formData.get("email")?.toString() as string;

    // Email validation
    if (!email.endsWith("@uci.edu")) {
      setStatusCode(400);
      setIsLoading(false);
      return;
    } else {
      const response = await fetch("/api/welcome", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const { data }: { data: User } = await response.json();
      setUser(data);
      if (data.is_admin) {
        setAdminVerify(true);
      } else {
        setStatusCode(response.status);
        setIsLoading(false);
        router.push("/");
      }
    }

    setIsLoading(true);
  };
  return (
    <>
      {adminVerify && (
        <AdminVerify setAdminVerify={setAdminVerify} data={user || null} />
      )}
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
          {" "}
          {/* New email input field */}
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            School Email
          </label>
          <div className="mt-2">
            <input
              disabled={isLoading}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
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
