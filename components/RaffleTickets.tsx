"use client";
import React, { useState } from "react";
import SASIConTicket from "@/public/sasiconTicket.png";
import Image from "next/image";

const RaffleTickets = () => {
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
        {isClicked ? <Information /> : <Logo />}
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

const Information = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>
        10 <span className="text-xs">Tickets</span>
      </p>
    </div>
  );
};
