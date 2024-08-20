import React, { useState } from "react";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { User } from "@/types/user";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function Example() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  const result = await sql`SELECT * FROM users WHERE id = ${userId?.value}`;
  const user = result.rows[0] as User;
  console.log(user);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
          <button type="button" className="-m-3 p-3">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-2 space-y-2 px-4">
            {Object.entries(user).map(([key, value]) => (
              <p
                key={key}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {key}: {JSON.stringify(value)}
              </p>
            ))}
          </div>
          <div className="mt-6 px-4">
            <div className="mt-2 space-y-2">
              <div className="mt-4">
                <div className="text-gray-900 font-semibold leading-7">
                  Workshops Attended:
                </div>
                {user.workshops.map((workshop, index) => (
                  <p key={index}>{workshop}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
