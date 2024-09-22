"use client";

import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { VoteContext } from "./VoteContainer";
import useHydration from "@/hooks/useHydration";
const BookmarkButton = ({ workId }: { workId: number }) => {
  const { bookmarked, setBookmarked } = React.useContext(VoteContext);
  const isBookmarked = bookmarked.includes(workId);
  const isHydrated = useHydration();
  return isHydrated ? (
    <button
      onClick={() => {
        if (isBookmarked) {
          setBookmarked((prev) => prev.filter((id) => id !== workId));
        } else {
          setBookmarked((prev) => [...prev, workId]);
        }
      }}
      className="bg-white rounded-full p-1.5 shadow-md"
    >
      <BookmarkIcon
        className={`w-5 h-auto text-black ${
          isBookmarked ? "text-yellow-400" : ""
        }`}
      />
    </button>
  ) : (
    <div className="bg-white rounded-full p-1.5 shadow-md">
      <BookmarkIcon className={`w-5 h-auto text-black`} />
    </div>
  );
};

export default BookmarkButton;
