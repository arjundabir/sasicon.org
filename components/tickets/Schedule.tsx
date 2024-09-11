import React from "react";

const Schedule = () => {
  return (
    <section className="flex-initial overflow-scroll">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Event Schedule
      </h2>
      <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T09:00">9:00 AM</time> -{" "}
            <time dateTime="2024-09-28T09:40">9:40 AM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Opening Speaker
          </p>
        </li>
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T09:50">9:50 AM</time> -{" "}
            <time dateTime="2024-09-28T10:50">10:50 AM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Workshop 1
          </p>
        </li>
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T11:00">11:00 AM</time> -{" "}
            <time dateTime="2024-09-28T12:00">12:00 PM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Lunch
          </p>
        </li>
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T12:00">12:00 PM</time> -{" "}
            <time dateTime="2024-09-28T12:45">12:45 PM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Q&A Panel
          </p>
        </li>
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T12:55">12:55 PM</time> -{" "}
            <time dateTime="2024-09-28T13:55">1:55 PM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Workshop 2
          </p>
        </li>
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T14:05">2:05 PM</time> -{" "}
            <time dateTime="2024-09-28T15:05">3:05 PM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Workshop 3
          </p>
        </li>
        <li className="py-4 sm:flex">
          <p className="w-full flex-none">
            <time dateTime="2024-09-28T15:15">3:15 PM</time> -{" "}
            <time dateTime="2024-09-28T16:00">4:00 PM</time>
          </p>
          <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
            Ending Keynote and Giveaway
          </p>
        </li>
      </ol>
    </section>
  );
};

export default Schedule;
