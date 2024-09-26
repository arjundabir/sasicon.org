"use client";

import colors from "@/data/colors";
import useHydration from "@/hooks/useHydration";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types/user";
import React, { Dispatch, SetStateAction } from "react";

interface VoteContainerProps {
  vote: User["vote"] | undefined;
  children: React.ReactNode;
  bookmarkVisible?: boolean;
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

const VoteContainer = ({
  children,
  vote,
  bookmarkVisible = true,
}: VoteContainerProps) => {
  const [voteId, setVoteId] = React.useState<number | null>(vote ?? null);
  const [bookmarked, setBookmarked] = useLocalStorage<number[]>(
    "bookmarked",
    []
  );

  // Position calculation for bookmarks
  const calculateBookmarkPositions = () => {
    const viewportHeight = window.innerHeight;
    return bookmarked.map((workId) => {
      const element = document.getElementById(workId.toString());
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const elementCenter = elementRect.y + elementRect.height / 2;
        return Math.min(
          99,
          Math.max(1, (elementCenter / viewportHeight) * 100)
        );
      }
      return 0;
    });
  };

  const [bookmarkPositions, setBookmarkPositions] = React.useState<number[]>(
    []
  );

  // Update bookmark positions when bookmarks change or on scroll
  React.useEffect(() => {
    const updateBookmarkPositions = () => {
      setBookmarkPositions(calculateBookmarkPositions());
    };

    updateBookmarkPositions();

    window.addEventListener("scroll", updateBookmarkPositions);

    return () => {
      window.removeEventListener("scroll", updateBookmarkPositions);
    };
  }, [bookmarked]);

  const scrollToBookmark = (index: number) => {
    if (bookmarked.length > 0) {
      const element = document.getElementById(bookmarked[index].toString());
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  const isHydrated = useHydration();

  return (
    <VoteContext.Provider
      value={{ voteId, setVoteId, bookmarked, setBookmarked }}
    >
      {children}
      {isHydrated && bookmarkVisible && (
        <div
          className={`fixed top-0 right-0 w-10 h-screen z-10 bg-black/10 transition-opacity ${
            bookmarkPositions.length > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {bookmarkPositions.map((position, index) => (
            <button
              key={index}
              onClick={() => scrollToBookmark(index)}
              style={{ top: `${position}%` }}
              className={`absolute w-full h-4 ${colors[index % colors.length]}`}
            />
          ))}
        </div>
      )}
    </VoteContext.Provider>
  );
};

export default VoteContainer;
