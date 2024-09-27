"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

const AskedQuestionAlert = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleQueue = () => {
    setShowQueue(true);
  };

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-800 text-white rounded-md px-2 py-1"
        onClick={handleQueue}
      >
        Put Question on the board
      </button>
      <button
        onClick={handleClick}
        className="bg-red-400 border rounded text-white font-medium text-lg px-2 py-1"
      >
        Question has been asked
      </button>
      {open && <AskedQuestionForm setOpen={setOpen} id={id} />}
      {showQueue && <ShowQuestionForm setOpen={setShowQueue} id={id} />}
    </div>
  );
};

export default AskedQuestionAlert;

interface AskedQuestionFormProps {
  setOpen: (open: boolean) => void;
  id: string;
}

const ShowQuestionForm = ({ setOpen, id }: AskedQuestionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handelShow = async () => {
    setIsLoading(true);
    const response = await fetch("/api/admin/panel/approval", {
      method: "POST",
      body: JSON.stringify({ id, status: "Queued" }),
    });
    if (response.ok) {
      setOpen(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="absolute h-dvh w-dvw inset-0 bg-black/50 z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-fit w-[90dvw] p-3 border rounded-lg z-20">
        <XMarkIcon className="h-6 w-6" onClick={() => setOpen(false)} />
        <div>
          <p>Question Number: {id.slice(0, 5)}</p>
        </div>
        <button
          onClick={handelShow}
          className="bg-green-600 text-white px-3 py-1 rounded-md"
          disabled={isLoading}
        >
          Show on Board
        </button>
      </div>
    </div>
  );
};

const AskedQuestionForm = ({ setOpen, id }: AskedQuestionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/admin/panel/approval", {
      method: "POST",
      body: JSON.stringify({ id, status: "Asked" }),
    });

    if (response.ok) {
      setMessage("Question deleted successfully");
    } else {
      setMessage("Failed to delete question");
    }
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <div className="absolute h-dvh w-dvw inset-0 bg-black/50 z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-fit w-[90dvw] p-3 border rounded-lg z-20">
        <XMarkIcon className="h-6 w-6" onClick={() => setOpen(false)} />
        <form>
          <div>
            <label className="text-left block text-sm font-medium leading-6 text-gray-900">
              {message ? message : "Are you sure the question has been asked?"}
            </label>
            <div className="mt-2 flex justify-between">
              <button
                onClick={(e) => setOpen(false)}
                className="bg-red-600 text-white px-3 py-1 rounded-md"
                disabled={isLoading}
              >
                No, it hasn&apos;t
              </button>
              <button
                onClick={(e) => handleSubmit(e, id)}
                className="bg-green-600 text-white px-3 py-1 rounded-md"
                disabled={isLoading}
              >
                Yes, it has
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
