"use client";

import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { VoteContext } from "./VoteContainer";
const BookmarkButton = ({ workId }: { workId: number }) => {
  const { bookmarked, setBookmarked } = React.useContext(VoteContext);
  const isBookmarked = bookmarked.includes(workId);
  return (
    <button
      onClick={() => {
        if (isBookmarked) {
          setBookmarked(bookmarked.filter((id) => id !== workId));
        } else {
          setBookmarked([...bookmarked, workId]);
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
  );
};

export default BookmarkButton;
