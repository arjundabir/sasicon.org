"use client";
import { User } from "@/types/user";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminStatusProps {
  user: User;
}

interface AdminModelProps extends AdminStatusProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModal = ({ user, setIsModalOpen }: AdminModelProps) => {
  const router = useRouter();
  const handleSubmit = async () => {
    const response = await fetch("/api/admin", {
      method: "PUT",
      body: JSON.stringify({ user_id: user.id, isAdmin: !user.is_admin }),
    });
    if (response.ok) {
      setIsModalOpen(false);
      router.refresh();
    }
  };
  return (
    <div className="absolute inset-0 h-dvh w-dvw bg-black/50 flex justify-center items-center z-10">
      <div className="w-full max-w-sm bg-white p-4 rounded-lg z-20">
        <h3 className="font-bold text-lg whitespace-normal">
          Are you sure you want to make this user an admin?
        </h3>
        <p className="py-4">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminStatus = ({ user }: AdminStatusProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <AdminModal user={user} setIsModalOpen={setIsModalOpen} />
      )}
      <button className="text-blue-800 " onClick={() => setIsModalOpen(true)}>
        {user.is_admin ? "Admin" : "Attendee"}
      </button>
    </>
  );
};

export default AdminStatus;
