import React from "react";
import AnteaterDemonstrationArchive from "@/public/anteater-demonstration-archive/ada.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center relative bg-[url('/anteater-demonstration-archive/bg.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src={AnteaterDemonstrationArchive}
        alt="Anteater Demonstration Archive"
        className="w-dvw relative h-auto max-h-dvh max-w-dvw object-contain"
      />
    </div>
  );
};

export default page;
