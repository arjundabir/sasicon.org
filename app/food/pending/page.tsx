import getUserId from "@/lib/get-userid";
import supabase from "@/lib/supabase";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import React from "react";

const page = async () => {
  const userId = getUserId();
  const { data, error } = await supabase
    .from("users")
    .update({ food_tickets: 0 })
    .eq("id", userId);
  if (error) {
    console.log(error);
  }
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <div>
        <RocketLaunchIcon className="h-10 w-auto text-gray-500 mx-auto" />
        <h1 className="text-2xl font-medium text-gray-500">
          Please hang on until all earlier attendees have received their food!
          We would like to prioritize those who have attended a workshop.
        </h1>
      </div>
    </div>
  );
};

export default page;
