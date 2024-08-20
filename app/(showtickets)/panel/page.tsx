import React from "react";
import SubmitQuestion from "@/components/panel/SubmitQuestion";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = cookies();
  const id = cookieStore.get("userId")?.value;

  return (
    <div className="flex flex-col min-h-dvh flex-1 justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Ask a Question to the Panel.
      </h2>
      <SubmitQuestion id={id as string} />
    </div>
  );
};

export default page;
