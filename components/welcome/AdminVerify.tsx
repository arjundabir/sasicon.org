"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const AdminVerify = ({
  setAdminVerify,
  data,
}: {
  setAdminVerify: (value: boolean) => void;
  data: User | null;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAdmin = inputValue === "yourSecretValue";
    const response = await fetch("/api/admin/welcome/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin, data }),
    });

    const result = await response.json();
    if (response.ok) {
      if (response.status === 200) {
        setMessage(result.message);
        window.location.href = "/";
        setAdminVerify(false);
      } else {
        setMessage("Verification failed");
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 w-dvw h-dvh flex flex-col justify-center items-center bg-black/50 p-1">
      <div className="bg-white rounded-lg p-4">
        {message && (
          <p className="text-red-500 text-center text-lg font-medium">
            {message}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded p-4 space-y-1"
        >
          <label
            htmlFor="verifyInput"
            className="text-black text-lg font-medium"
          >
            Enter Verification Code:
          </label>
          <input
            id="verifyInput"
            type="text"
            className="border border-black rounded px-2 py-1 w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-800 rounded px-3 py-1 text-white font-bold"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminVerify;
