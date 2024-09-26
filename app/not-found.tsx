import Link from "next/link";
import React from "react";
import Image from "next/image";
import cloudSky from "@/public/cloud-sky.png";

const NotFound = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center text-4xl font-bold relative p-2">
      <Image
        src={cloudSky}
        alt="Cloud Sky"
        className="w-dvw h-dvh object-cover absolute top-0 left-0"
      />
      <div className="z-10 flex flex-col items-center justify-center space-y-2">
        <p className="text-white text-8xl">404</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-800 text-white rounded-md text-base"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
