import React from "react";
import ChantCamp from "@/public/chant-camp/poster.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="bg-[#f2c161] h-dvh w-dvw flex justify-center items-center">
      <Image src={ChantCamp} alt="Chant Camp" className="w-dvw" />
    </div>
  );
};

export default page;
