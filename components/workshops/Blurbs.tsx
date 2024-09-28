"use client";

import { MinusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const Blurbs = ({ snippet, title }: { snippet: string; title: string }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleSwipe = (e: TouchEvent) => {
      if (e.type === "touchstart") {
        startY = e.touches[0].clientY;
      } else if (e.type === "touchend") {
        const endY = e.changedTouches[0].clientY;
        if (startY - endY > 50) {
          setClicked(true);
        } else if (endY - startY > 50) {
          setClicked(false);
        }
      }
    };

    let startY = 0;
    window.addEventListener("touchstart", handleSwipe);
    window.addEventListener("touchend", handleSwipe);

    return () => {
      window.removeEventListener("touchstart", handleSwipe);
      window.removeEventListener("touchend", handleSwipe);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-300 absolute bottom-0 left-0 bg-white w-full rounded-t-xl overflow-hidden ${
        clicked ? "h-96" : "h-6"
      }`}
    >
      <div
        className="flex justify-center items-center w-full h-6 px-8"
        onClick={() => setClicked(!clicked)}
      >
        <div className="w-full rounded-xl h-1 bg-gray-200" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{title} Overview</h2>
        <p className="text-sm text-gray-500">{snippet}</p>
      </div>
    </div>
  );
};

export default Blurbs;
