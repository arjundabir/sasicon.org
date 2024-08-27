"use client";
import { User } from "@/types/user";
import AddTickets from "@/components/admin/AddTickets";
import AdminStatus from "./AdminStatus";
import { BarsArrowUpIcon, UsersIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

export default function Table({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="sm:px-6 lg:px-8 flex-1 overflow-y-auto overflow-x-hidden">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all attendees at SASICon. Add or remove attendees. Update
            their raffle tickets.
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search names
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UsersIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Search first name"
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon
              aria-hidden="true"
              className="-ml-0.5 h-5 w-5 text-gray-400"
            />
            Sort
          </button>
        </div>
      </div>

      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 table-fixed">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 whitespace-nowrap"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                  >
                    Raffle Tickets
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 sm:pr-0 whitespace-nowrap"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.first_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.last_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.raffle_tickets}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <AdminStatus user={user} />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-blue-800 hover:text-blue-900">
                        <AddTickets id={user.id} firstName={user.first_name} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
