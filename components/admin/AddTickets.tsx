"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AddTicketsProps {
  id: string;
  firstName: string;
}
const AddTickets = ({ id, firstName }: AddTicketsProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <button onClick={handleClick}>Add Tickets</button>
      {open && (
        <AddTicketsForm setOpen={setOpen} id={id} firstName={firstName} />
      )}
    </>
  );
};

export default AddTickets;

interface AddTicketsFormProps {
  setOpen: (open: boolean) => void;
  id: string;
  firstName: string;
}
const AddTicketsForm = ({ setOpen, id, firstName }: AddTicketsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const tickets = formData.get("tickets") as unknown as number;
    try {
      const response = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, tickets }),
      });
      if (!response.ok) {
        throw new Error("Failed to add tickets");
      }
      const { message } = await response.json();
      setMessage(message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-fit w-[90dvw] p-3 border rounded-lg">
      <XMarkIcon className="h-6 w-6" onClick={() => setOpen(false)} />
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="firstName"
            className="text-left block text-sm font-medium leading-6 text-gray-900"
          >
            {message ? message : "Number of Raffle Tickets to give "}
            <span className="font-bold">{firstName}</span>
          </label>
          <div className="mt-2">
            <input
              disabled={isLoading}
              id="tickets"
              name="tickets"
              type="number"
              placeholder="0"
              required
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-800 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="mt-3 bg-blue-800 text-white px-3 py-1 rounded-md"
            >
              Add Raffle Tickets
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
