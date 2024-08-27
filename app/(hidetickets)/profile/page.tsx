import React from "react";
import { cookies } from "next/headers";
import { HomeIcon } from "@heroicons/react/24/outline";
import { User } from "@/types/user";
import Link from "next/link";
import { Certificate } from "@/types/certificate";
import connectToSupabase from "@/lib/connectToSupabase";

export default async function Example() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  let user: User | null = null;
  const supabase = connectToSupabase();
  try {
    const result = await supabase
      .from("users")
      .select("*")
      .eq("id", userId?.value);
    if (result.data) {
      user = result.data[0] as User;
    }
  } catch (error) {
    console.log(error);
  }

  let certificate: Certificate | undefined = undefined;
  try {
    const result = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId?.value);
    if (result.data) {
      certificate = result.data[0] as Certificate;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    user && (
      <>
        <div className="flex h-16 border-b border-gray-900/10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
            <button type="button" className="-m-3 p-3 border">
              <Link href="/">
                <HomeIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-900"
                />
              </Link>
            </button>
          </div>

          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="-m-2.5 p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <HomeIcon aria-hidden="true" className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-2 space-y-2 px-4">
              <div className="text-gray-900 font-semibold leading-7">
                User Information
                <NavItem>
                  User ID: <NavEntry>{user.id}</NavEntry>
                </NavItem>
                <NavItem>
                  Name:{" "}
                  <NavEntry>
                    {user.first_name} {user.last_name}
                  </NavEntry>
                </NavItem>
                <NavItem>
                  Raffle Tickets: <NavEntry>{user.raffle_tickets}</NavEntry>
                </NavItem>
              </div>
            </div>
            <div className="px-4">
              <div className="mt-2 space-y-2">
                <div className="mt-4">
                  <div className="text-gray-900 font-semibold leading-7">
                    Workshops Attended:
                  </div>
                  <ul className=" list-disc pl-4">
                    {user.workshops.map((workshop, index) => (
                      <li key={index}>{workshop}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-4">
              <div className="mt-2 space-y-2">
                <div className="mt-4">
                  <div className="text-gray-900 font-semibold leading-7">
                    Enrolled in Certificate Program:
                  </div>
                  <p className=" list-disc">
                    {certificate !== undefined ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

const NavItem = ({ children }: { children: React.ReactNode }) => (
  <p className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
    {children}
  </p>
);

const NavEntry = ({ children }: { children: React.ReactNode }) => (
  <span className="font-normal">{children}</span>
);
