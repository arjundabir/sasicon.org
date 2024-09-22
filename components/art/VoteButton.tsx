"use client";

import React from "react";
import { VoteContext } from "./VoteContainer";

const VoteButton = ({ id }: { id: number }) => {
  const { voteId, setVoteId } = React.useContext(VoteContext);

  const handleVote = async () => {
    const response = await fetch("/api/art", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      const data = await response.json();
      setVoteId(data.vote);
    } else {
      console.error("Failed to vote");
    }
  };
  const selected = voteId === id;
  return (
    <button
      disabled={selected}
      onClick={() => {
        handleVote();
      }}
      className={`w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 disabled:bg-green-100 disabled:hover:bg-green-100 bg-gray-100 hover:bg-gray-200`}
    >
      {selected ? "Selected" : "Vote"}
    </button>
  );
};

export default VoteButton;
