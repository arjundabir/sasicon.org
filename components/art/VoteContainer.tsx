"use client";

import { User } from "@/types/user";
import React, { Dispatch, SetStateAction } from "react";

interface VoteContainerProps {
  vote: User["vote"] | undefined;
  children: React.ReactNode;
}

type VoteContextType = {
  voteId: number | null;
  setVoteId: Dispatch<SetStateAction<number | null>>;
  bookmarked: number[];
  setBookmarked: Dispatch<SetStateAction<number[]>>;
};

const defaultVoteContext: VoteContextType = {
  voteId: null,
  setVoteId: () => {},
  bookmarked: [],
  setBookmarked: () => {},
};

export const VoteContext =
  React.createContext<VoteContextType>(defaultVoteContext);

const VoteContainer = ({ children, vote }: VoteContainerProps) => {
  const [voteId, setVoteId] = React.useState<number | null>(vote ?? null);
  const [bookmarked, setBookmarked] = React.useState<number[]>([]);

  React.useEffect(() => {
    console.log("voteId", voteId);
  }, [voteId]);

  return (
    <VoteContext.Provider
      value={{ voteId, setVoteId, bookmarked, setBookmarked }}
    >
      {children}
      <div className="absolute top-0 right-0 w-10 h-dvh bg-yellow-400 z-10">
        <div className="w-full h-2 bg-red-500" />
      </div>
    </VoteContext.Provider>
  );
};

export default VoteContainer;
