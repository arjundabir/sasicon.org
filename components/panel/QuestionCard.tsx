import React from "react";
import { Panel } from "@/types/panel";

interface QuestionCardProps extends Panel {
  isEditing: boolean;
  editText: string;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (newText: string) => void;
  onEditTextChange: (text: string) => void;
  id: string;
  index: number;
  onApprove: () => void;
}

const statusColors = {
  Pending: "text-gray-500",
  Approved: "text-green-500",
  Rejected: "text-red-500",
  Modified: "text-blue-500",
  Asked: "text-gray-500",
};

export default function QuestionCard({
  question,
  status,
  isEditing,
  editText,
  onEdit,
  onDelete,
  onSave,
  onEditTextChange,
  id,
  index,
  onApprove,
}: QuestionCardProps) {
  return (
    <div className="w-full p-2 ">
      <div className="relative border border-gray-200 p-4 rounded-lg">
        {status === "Rejected" && (
          <div className="absolute top-0 left-0 w-full h-full bg-red-300/50 z-50 rounded-lg" />
        )}

        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between ">
          <div className="ml-4 mt-4 ">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
              Question {index + 1}
            </h3>
          </div>
          <div className="ml-4 mt-4 flex flex-shrink-0">
            <button
              type="button"
              onClick={onEdit}
              disabled={status === "Approved"}
              className="relative inline-flex items-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
            >
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="relative ml-3 inline-flex items-center rounded-md text-white px-3 py-2 text-sm font-semibold bg-red-500 shadow-sm hover:bg-red-500"
            >
              <span>Delete</span>
            </button>
          </div>
          <div className="ml-4 mt-2 w-full border-t border-gray-200 flex items-end">
            <div className="">
              <div className="w-full">
                {isEditing ? (
                  <textarea
                    value={editText}
                    onChange={(e) => onEditTextChange(e.target.value)}
                    onBlur={() => onSave(editText)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSave(editText);
                    }}
                    className="w-full mt-2 border rounded-md border-blue-500 focus:outline-none text-lg"
                    autoFocus
                    onFocus={(e) => e.target.select()}
                  />
                ) : (
                  <p className="mt-2 text-lg break-words whitespace-normal">
                    {question}
                  </p>
                )}
              </div>
              <div
                className={`mt-2 text-sm ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                Status: {status}
              </div>
              {status === "Modified" && (
                <button
                  className="border bg-green-500 text-white font-medium text-sm px-2 py-1 rounded-md active:bg-green-400 active:text-white"
                  onClick={() => onApprove()}
                >
                  Click here to Approve Changes
                </button>
              )}
            </div>
            {status === "Approved" && (
              <div className="flex-1 flex flex-col items-end mt-2">
                <div className="text-black text-sm rounded-md w-fit h-auto">
                  Place in Queue
                </div>
                <button className="bg-green-500 mt-1 font-medium text-lg text-white p-0.5 rounded-md w-10 h-10">
                  1
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
