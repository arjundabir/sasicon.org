import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { Work } from "@/types/work";
import { ArrowTopRightOnSquareIcon, StarIcon } from "@heroicons/react/24/solid";
import VoteButton from "./VoteButton";
import { User } from "@/types/user";
import VoteContainer from "./VoteContainer";
import BookmarkButton from "./BookmarkButton";

type ArtListProps = {
  works: Work[] | undefined;
  user: User | undefined;
};

const ArtList = ({ works, user }: ArtListProps) => {
  return (
    <VoteContainer vote={user?.vote}>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <Link href="/">
            <Image src={Logo} alt="Certificate" width={80} height={80} />
          </Link>
          <h2 className="text-xl font-semibold text-gray-900">
            Vote for your favorite art work.
          </h2>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 w-full">
              All Art Works
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {works?.map((work) => {
                return <ArtCard key={work.id} work={work} user={user} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </VoteContainer>
  );
};

const ArtCard = ({ work, user }: { work: Work; user: User | undefined }) => {
  return (
    <div id={work.id.toString()} key={work.id} className="relative">
      <div className="relative h-fit w-full overflow-hidden border rounded-lg">
        {work.submission_link.includes(".pdf") ? (
          <iframe
            src={work.submission_link}
            width="100%"
            className={`h-full ${
              work.title.toLowerCase().includes("triptych")
                ? "aspect-[11/6.5]"
                : "aspect-[8.5/11]"
            }`}
            title="PDF Viewer"
          />
        ) : (
          <Image
            alt={work.title}
            src={work.submission_link}
            className="h-full w-full object-contain object-center"
            width={500}
            height={500}
            loading="lazy"
          />
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <BookmarkButton workId={work.id} />
          <div className="bg-white rounded-full p-1.5 shadow-md">
            <Link href={`/art/${work.id}`}>
              <ArrowTopRightOnSquareIcon className="w-5 h-auto text-black" />
            </Link>
          </div>
        </div>
      </div>
      <div className="relative mt-4">
        <h3 className="text-lg font-medium text-gray-900 truncate text-ellipsis">
          {work.title}
        </h3>
        {work.choice !== "anonymous" && (
          <p className="text-sm text-black">{work.first_last_name}</p>
        )}
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 text-ellipsis">
          {work.description}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <VoteButton id={work.id} />
      </div>
    </div>
  );
};

export default ArtList;
