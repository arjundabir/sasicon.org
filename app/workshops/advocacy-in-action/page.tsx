import React from "react";
import AdvocacyInAction from "@/public/advocacy-in-action/poster.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <Image
        src={AdvocacyInAction}
        alt="Advocacy In Action"
        className="w-dvw"
      />
    </div>
  );
};

export default page;
