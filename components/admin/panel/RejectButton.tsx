import React, { useState } from "react";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
}

const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  onReject,
}) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (reason.trim() === "") {
      alert("Please enter a reason for rejection.");
      return;
    }
    onReject(reason);
    setReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold">Reject Reason</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mt-2"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
