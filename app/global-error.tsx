"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import cloudSky from "@/public/cloud-sky.png";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="h-dvh w-dvw flex flex-col items-center justify-center text-4xl font-bold relative p-2">
          <Image
            src={cloudSky}
            alt="Cloud Sky"
            className="w-dvw h-dvh object-cover absolute top-0 left-0"
          />
          <div className="z-10 flex flex-col items-center justify-center space-y-2">
            <p className="text-white text-xl">Something went wrong</p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-blue-800 text-white rounded-md text-base"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-800 text-white rounded-md text-base"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
