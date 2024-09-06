"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { MinusIcon } from "@heroicons/react/24/solid"; // Assuming you have a BeanIcon

export default function Drawer() {
  const [open, setOpen] = useState(true);

  // Swipe detection
  useEffect(() => {
    const handleSwipe = (e: TouchEvent) => {
      if (e.type === "touchstart") {
        startX = e.touches[0].clientX;
      } else if (e.type === "touchend") {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
          setOpen(true);
        }
      }
    };

    let startX = 0;
    window.addEventListener("touchstart", handleSwipe);
    window.addEventListener("touchend", handleSwipe);

    return () => {
      window.removeEventListener("touchstart", handleSwipe);
      window.removeEventListener("touchend", handleSwipe);
    };
  }, []);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 text-white rounded "
        >
          <MinusIcon className="h-12 w-auto stroke-[100px] rotate-90" />
        </button>
      )}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-96 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="h-full overflow-y-auto bg-white p-8">
                  <div className="space-y-6 pb-16">
                    <div>
                      <div className="mt-4 flex items-start justify-between">
                        <div>
                          <h2 className="text-base font-semibold leading-6 text-gray-900">
                            <span className="sr-only">Details for </span>
                            Hey Arjun Dabir,
                          </h2>
                          <p className="text-sm font-medium text-gray-500">
                            Welcome to SASICon 2024!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Information</h3>
                      <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Raffle Tickets:</dt>
                          <dd className="text-gray-900">1</dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Food Tickets:</dt>
                          <dd className="text-gray-900">1</dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">Checked in:</dt>
                          <dd className="text-gray-900">June 8, 2020</dd>
                        </div>
                      </dl>
                    </div>

                    <section className="">
                      <h2 className="text-base font-semibold leading-6 text-gray-900">
                        Upcoming events
                      </h2>
                      <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
                        <li className="py-4 sm:flex">
                          <p className="w-full flex-none">
                            <time dateTime="2024-09-28T10:30">10:30 AM</time> -{" "}
                            <time dateTime="2024-09-28T11:00">11:00 AM</time>
                          </p>
                          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                            Check-in.
                          </p>
                        </li>
                        <li className="py-4 sm:flex">
                          <p className="w-full flex-none">All day</p>
                          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                            Event #1.
                          </p>
                        </li>
                        <li className="py-4 sm:flex">
                          <p className="w-full flex-none">
                            <time dateTime="2024-09-28T10:00">10:00 AM</time> -{" "}
                            <time dateTime="2024-09-28T10:15">10:15 AM</time>
                          </p>
                          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                            Event #2.
                          </p>
                        </li>
                      </ol>
                    </section>
                    <div>
                      <h3 className="font-medium text-gray-900">To Do:</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm italic text-gray-500">
                          Vote your favorite art piece!
                        </p>
                        <button
                          type="button"
                          className="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <span className="absolute -inset-1.5" />
                          <ArrowTopRightOnSquareIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                          <span className="sr-only">Add description</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <a
                      href="mailto:sasiatuci@gmail.com"
                      className="flex-1 rounded-md text-center bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Questions? Contact us!
                    </a>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
