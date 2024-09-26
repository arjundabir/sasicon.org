"use client";
import React, { useState } from "react";

interface UserRaffleTickets {
  first_name: string;
  last_name: string;
  raffle_tickets: number;
}
interface RandomGeneratorProps {
  allUserRaffleTickets: UserRaffleTickets[] | null;
}

const RandomGenerator = ({ allUserRaffleTickets }: RandomGeneratorProps) => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [winner, setWinner] = useState<UserRaffleTickets | null>(null);
  const handleGenerate = () => {
    const totalTickets = allUserRaffleTickets?.reduce(
      (acc, user) => acc + user.raffle_tickets,
      0
    );
    if (!totalTickets || !allUserRaffleTickets) return;

    let randomIndex = Math.floor(Math.random() * totalTickets);
    setRandomNumber(randomIndex);

    for (const user of allUserRaffleTickets) {
      if (randomIndex < user.raffle_tickets) {
        setWinner(user);
        break;
      }
      randomIndex -= user.raffle_tickets;
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-medium">Random Generator</h1>
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Generate
      </button>
      <p className="text-lg">Random Number: {randomNumber}</p>
      {winner && (
        <div className="mt-4">
          <h1 className="text-xl font-medium">Winner</h1>
          <p className="text-lg">
            {winner?.first_name} {winner?.last_name}
          </p>
        </div>
      )}
    </div>
  );
};

export default RandomGenerator;
