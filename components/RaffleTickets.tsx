"use client";
import React, { useState } from "react";
import SASIConTicket from "@/public/sasiconTicket.png";
import Image from "next/image";

interface RaffleTicketsProps {
  tickets: string;
}

const RaffleTickets = ({ tickets }: RaffleTicketsProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="absolute bottom-2 right-2">
      <div
        className={`flex flex-col items-center justify-center transition-all duration-500 bg-white shadow-lg ${
          isClicked
            ? "h-[8dvh] w-[20dvh] rounded-[10px]"
            : "h-[8dvh] w-[8dvh] rounded-[100px]"
        }`}
        onClick={() => setIsClicked(!isClicked)}
      >
        {isClicked ? <Information raffleTickets={tickets} /> : <Logo />}
      </div>
    </div>
  );
};

export default RaffleTickets;

const Logo = () => {
  return (
    <Image
      src={SASIConTicket}
      alt="SASICon Raffle Ticket"
      width={40}
      height={40}
      priority
    />
  );
};

const Information = ({ raffleTickets }: { raffleTickets: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-0.5 px-2">
      {!raffleTickets ? (
        <p className="text-sm">Check in to get your tickets.</p>
      ) : (
        <p>
          {raffleTickets} <span className="text-xs">Ticket(s)</span>
        </p>
      )}
    </div>
  );
};
