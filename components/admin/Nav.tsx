"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";

const navItems = [
  {
    name: "Dashboard (add raffle tickets)",
    href: "/admin",
  },
  {
    name: "Art Leaderboard",
    href: "/admin/art",
  },
  {
    name: "Panel",
    href: "/admin/panel",
  },
  {
    name: "Raffle",
    href: "/admin/raffle",
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute bottom-4 right-4 rounded-md bg-white px-4 py-2 w-fit  ">
      {isOpen ? (
        <div className="flex flex-col gap-2 divide-y divide-black">
          <XMarkIcon
            className="ml-auto w-5 h-5 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="py-2">
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <button className="font-medium" onClick={() => setIsOpen(!isOpen)}>
            Admin Nav
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
