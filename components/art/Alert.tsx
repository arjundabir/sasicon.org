import { XCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const Alert = ({ show }: { show: boolean }) => {
  return (
    <div
      className={`fixed left-0 w-full h-20 flex flex-col justify-center transition-all duration-300 z-50 p-2 ease-in-out ${
        show ? "top-0" : "-top-20"
      }`}
    >
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              You can only vote for 2 art works.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
