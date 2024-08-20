"use client";
import React, { useState } from "react";
import SASIConTicket from "@/public/sasiconTicket.png";
import Image from "next/image";
import { TicketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

interface RaffleTicketsProps {
  tickets: string;
}

const dropdownItems = [
  { value: "Profile", href: "/profile" },
  { value: "Check In", href: "/checkin" },
  { value: "Contact Us", href: "mailto:sasiatuci@gmail.com" },
];

const Button = ({ tickets }: RaffleTicketsProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="absolute bottom-2 right-2">
      <div
        className={`flex flex-col items-center justify-center transition-all duration-500 bg-white shadow-lg p-3 rounded-lg w-fit`}
      >
        {isClicked ? (
          <Dropdown raffleTickets={tickets} setIsClicked={setIsClicked} />
        ) : (
          <Logo setIsClicked={setIsClicked} />
        )}
      </div>
    </div>
  );
};

export default Button;

const Logo = ({
  setIsClicked,
}: {
  setIsClicked: (isClicked: boolean) => void;
}) => {
  return (
    <button onClick={() => setIsClicked(true)}>
      <TicketIcon className="w-10 h-10" />
      {/* <Image
        src={SASIConTicket}
        alt="SASICon Raffle Ticket"
        className="w-10 h-10"
        priority
      /> */}
    </button>
  );
};

const Dropdown = ({
  raffleTickets,
  setIsClicked,
}: {
  raffleTickets: string;
  setIsClicked: (isClicked: boolean) => void;
}) => {
  return (
    <div className="flex flex-col justify-center w-40 px-1 space-y-2">
      <XMarkIcon
        className="w-5 self-start"
        onClick={() => setIsClicked(false)}
      />
      <p className="flex justify-between w-full fond-bold">
        Raffle Tickets <span className="font-normal">{raffleTickets}</span>
      </p>
      <hr className="w-full" />
      <Link href="/profile" className="underline flex gap-1">
        <ArrowTopRightOnSquareIcon className="w-5" />
        <p>Access Profile</p>
      </Link>
    </div>
  );
};
