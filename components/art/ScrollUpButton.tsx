"use client";
import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ScrollUpButton = ({ visible }: { visible: boolean }) => {
  return (
    <div
      className={`fixed right-4 z-50 transition-all duration-300 ${
        visible ? "bottom-4" : "-bottom-20"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`bg-white text-gray-900 p-2 rounded-md shadow-md flex items-center gap-2 transition-all duration-300 w-fit`}
      >
        <ArrowUpIcon className="w-auto h-6 stroke-2" />
      </button>
    </div>
  );
};

export default ScrollUpButton;
