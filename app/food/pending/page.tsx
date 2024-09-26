import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import React from "react";

const page = async () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <div>
        <RocketLaunchIcon className="h-10 w-auto text-red-400 mx-auto" />
        <h1 className="text-base font-medium text-red-400 px-4 text-center">
          Please hang on until all earlier attendees have received their food!
          We would like to prioritize those who have attended a workshop.
        </h1>
      </div>
    </div>
  );
};

export default page;
