import React from "react";
import BuildingABlueprint from "@/public/building-a-blueprint/poster.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-[url('/building-a-blueprint/bg.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src={BuildingABlueprint}
        alt="Building A Blueprint"
        className="w-dvw relative h-auto max-h-dvh max-w-dvw object-contain"
      />
    </div>
  );
};

export default page;
