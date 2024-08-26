"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface InputModel extends EditQuestionButtonProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface EditQuestionButtonProps {
  id: number;
  user_id?: string;
}

const InputModal = ({ isOpen, closeModal, user_id, id }: InputModel) => {
  const router = useRouter();
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    const response = await fetch("/api/panel/ask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, user_id, question }),
    });
    if (response.ok) {
      router.push("/panel");
      closeModal();
    }
  };

  return (
    isOpen && (
      <div className="absolute w-dvw h-dvh top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col z-10 border rounded-lg bg-black/25">
        <form
          onSubmit={handleEdit} // Ensure the form uses the custom submit handler
          className="absolute w-[95dvw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col border rounded-md bg-white p-3 z-20"
        >
          <label
            htmlFor="question"
            className="block text-sm font-medium leading-6 text-gray-900 text-left whitespace-normal"
          >
            Edit your Question{" "}
            <span className="text-xs text-gray-500">
              (this will reset your status to pending)
            </span>
          </label>
          <div className="mt-2">
            <textarea
              id="question"
              name="question"
              rows={4}
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={closeModal}>
              Close
            </button>
            <button type="submit" className="bg-gray-200 p-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  );
};

const EditQuestionButton = ({ id, user_id }: EditQuestionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => openModal()} className="text-blue-900">
        Edit
      </button>
      <InputModal
        isOpen={isOpen}
        closeModal={closeModal}
        id={id}
        user_id={user_id}
      />
    </>
  );
};

export default EditQuestionButton;
