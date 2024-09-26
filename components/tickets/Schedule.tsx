import React from "react";

const events = [
  {
    start: "2024-09-28T10:15",
    end: "2024-09-28T10:40",
    title: "Check In & Breakfast Refreshments",
  },
  {
    start: "2024-09-28T10:50",
    end: "2024-09-28T11:50",
    title: "Workshops: 'Develop'",
  },
  {
    start: "2024-09-28T12:00",
    end: "2024-09-28T12:45",
    title: "Lunch",
  },
  {
    start: "2024-09-28T12:55",
    end: "2024-09-28T13:35",
    title: "UCI Administration Q&A",
  },
  {
    start: "2024-09-28T13:45",
    end: "2024-09-28T14:45",
    title: "Workshops: 'Design'",
  },
  {
    start: "2024-09-28T14:45",
    end: "2024-09-28T15:45",
    title: "Workshops: 'Demonstrate'",
  },
  {
    start: "2024-09-28T16:05",
    end: "2024-09-28T16:30",
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
          .filter((event) => new Date(event.start) > timeNow)
          .map((event, index) => (
            <li key={index} className="py-4 sm:flex">
              <p className="w-full flex-none">
                <time dateTime={event.start}>
                  {new Date(event.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>{" "}
                -{" "}
                <time dateTime={event.end}>
                  {new Date(event.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </p>
              <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                {event.title}
              </p>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default Schedule;
