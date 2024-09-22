"use client";

import colors from "@/data/colors";
import useHydration from "@/hooks/useHydration";
import useLocalStorage from "@/hooks/useLocalStorage";
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
  const [bookmarked, setBookmarked] = useLocalStorage<number[]>(
    "bookmarked",
    []
  );
  const [bookmarks, setBookmarks] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (bookmarked.length > 0) {
      const viewportHeight = window.screen.availHeight;
      bookmarked.forEach((work_id, index) => {
        const element = document.getElementById(work_id.toString());
        if (element) {
          const updateBookmarkPosition = () => {
            const elementRect = element.getBoundingClientRect();
            const elementCenter = elementRect.y + elementRect.height / 2;
            const elementCenterRelativeToViewport = elementCenter;
            const newBookmarkPositionPercentage = Math.min(
              99,
              Math.max(
                1,
                (elementCenterRelativeToViewport / viewportHeight) * 100
              )
            );

            setBookmarks((prev) => {
              const newBookmarks = [...prev];
              newBookmarks[index] = newBookmarkPositionPercentage;
              return newBookmarks;
            });
            console.log(newBookmarkPositionPercentage);
          };

          updateBookmarkPosition();

          window.addEventListener("scroll", () => {
            updateBookmarkPosition();
          });

          return () => {
            window.removeEventListener("scroll", updateBookmarkPosition);
          };
        }
      });
    }
  }, [bookmarked]);

  const scrollToBookmark = (index: number) => {
    if (bookmarks.length > 0) {
      const element = document.getElementById(bookmarked[index].toString());
      console.log(element);
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
      {isHydrated && bookmarks.length > 0 && (
        <div className="fixed top-0 right-0 w-10 h-dvh z-10 bg-black/10 transition-opacity duration-300">
          {bookmarks.map((bookmark, index) => (
            <button
              key={index}
              onClick={() => {
                scrollToBookmark(index);
              }}
              style={{ top: `${bookmark}%` }}
              className={`absolute w-full h-4 ${colors[index % colors.length]}`}
            />
          ))}
        </div>
      )}
    </VoteContext.Provider>
  );
};

export default VoteContainer;
