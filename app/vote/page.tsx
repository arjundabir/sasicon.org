"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";

const Page = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = [
    { id: 1, color: "bg-black" },
    { id: 2, color: "bg-blue-100" },
    { id: 3, color: "bg-red-100" },
    { id: 4, color: "bg-green-100" },
  ];

  useEffect(
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = itemRefs.current.indexOf(
                entry.target as HTMLDivElement
              );
              setCurrentIndex(index);
            }
          });
        },
        { threshold: 0.5 }
      );

      const currentItemRefs = itemRefs.current; // Copy itemRefs.current to a variable

      currentItemRefs.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => {
        if (currentItemRefs) {
          currentItemRefs.forEach((ref) => {
            if (ref) observer.unobserve(ref);
          });
        }
      };
    },
    [
      /* dependencies */
    ]
  );

  const handleSelect = () => {
    if (currentIndex !== null && !selectedItems.includes(currentIndex)) {
      if (selectedItems.length < 2) {
        setSelectedItems([...selectedItems, currentIndex]);
      }
    }
  };

  const handleUnselect = () => {
    if (currentIndex !== null && selectedItems.includes(currentIndex)) {
      setSelectedItems(selectedItems.filter((item) => item !== currentIndex));
    }
  };

  return (
    <div className="h-dvh w-dvw flex flex-col">
      <div className="p-4 mt-auto">
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          className="h-20 w-auto"
        />
        <h1 className="text-2xl font-bold ">
          Vote 2 of your Favorite Artworks.
        </h1>
      </div>
      <div className="my-auto p-4">
        <div className="inline-flex overflow-x-scroll snap-x snap-mandatory w-full">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`${item.color} w-96 h-96 flex-shrink-0 snap-start ${
                selectedItems.includes(index) ? "border-4 border-green-500" : ""
              }`}
            ></div>
          ))}
        </div>
        {currentIndex !== null && (
          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={handleSelect}
              className="bg-blue-800 text-white px-4 py-2 rounded-md"
            >
              Select
            </button>
            <button
              onClick={handleUnselect}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Unselect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
