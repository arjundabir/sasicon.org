"use client";
import React from "react";

const events = [
  {
    start: "2024-09-28T16:30:00Z", // 09:30 PST + 7 hours = 16:30 UTC
    end: "2024-09-28T17:10:00Z", // 10:10 PST + 7 hours = 17:10 UTC
    title: "Check In & Breakfast Refreshments",
  },
  {
    start: "2024-09-28T17:15:00Z", // 10:15 PST + 7 hours = 17:15 UTC
    end: "2024-09-28T17:50:00Z", // 10:40 PST + 7 hours = 17:40 UTC
    title: "Live Table Read and Annotation",
  },
  {
    start: "2024-09-28T17:50:00Z", // 10:50 PST + 7 hours = 17:50 UTC
    end: "2024-09-28T18:50:00Z", // 11:50 PST + 7 hours = 18:50 UTC
    title: "Workshops: 'Develop'",
  },
  {
    start: "2024-09-28T19:00:00Z", // 12:00 PST + 7 hours = 19:00 UTC
    end: "2024-09-28T19:45:00Z", // 12:45 PST + 7 hours = 19:45 UTC
    title: "Lunch",
  },
  {
    start: "2024-09-28T19:55:00Z", // 12:55 PST + 7 hours = 19:55 UTC
    end: "2024-09-28T20:35:00Z", // 13:35 PST + 7 hours = 20:35 UTC
    title: "UCI Administration Q&A",
  },
  {
    start: "2024-09-28T20:45:00Z", // 13:45 PST + 7 hours = 20:45 UTC
    end: "2024-09-28T21:45:00Z", // 14:45 PST + 7 hours = 21:45 UTC
    title: "Workshops: 'Design'",
  },
  {
    start: "2024-09-28T21:45:00Z", // 14:45 PST + 7 hours = 21:45 UTC
    end: "2024-09-28T22:45:00Z", // 15:45 PST + 7 hours = 22:45 UTC
    title: "Workshops: 'Demonstrate'",
  },
  {
    start: "2024-09-28T23:05:00Z", // 16:05 PST + 7 hours = 23:05 UTC
    end: "2024-09-28T23:30:00Z", // 16:30 PST + 7 hours = 23:30 UTC
    title: "Closing Remarks & Raffle",
  },
];

const Schedule = () => {
  const timeNow = new Date();
  return (
    <section className="flex-initial overflow-scroll">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Event Schedule
      </h2>
      <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
        {events
          .filter((event) => new Date(event.end) > timeNow)
          .map((event, index) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            const isInProgress = eventStart <= timeNow && eventEnd >= timeNow;

            return (
              <li key={index} className="py-4 sm:flex">
                <p className="w-full flex-none">
                  {isInProgress ? (
                    <span className="text-yellow-500 italic">In Progress</span>
                  ) : (
                    <>
                      <time dateTime={event.start}>
                        {eventStart.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>{" "}
                      -{" "}
                      <time dateTime={event.end}>
                        {eventEnd.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </>
                  )}
                </p>
                <p
                  className={
                    "mt-2 flex-auto font-semibold sm:mt-0 " +
                    (isInProgress ? " text-blue-800" : " text-gray-900")
                  }
                >
                  {event.title}
                </p>
              </li>
            );
          })}
      </ol>
    </section>
  );
};

export default Schedule;
