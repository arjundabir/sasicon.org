import React from "react";
import Image from "next/image";
import { Work } from "@/types/work";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, StarIcon } from "@heroicons/react/24/solid";

type WorkWithVotes = Work & {
  total_votes: number;
};

type ArtListProps = {
  works: WorkWithVotes[] | undefined;
};

const ArtList = ({ works }: ArtListProps) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Art Work Leaderboard
        </h2>
        <div className="mt-8">
          <div className="mt-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {works
              ?.filter((work) => work.total_votes > 0)
              .map((work) => {
                return <ArtCard key={work.id} work={work} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArtCard = ({ work }: { work: WorkWithVotes }) => {
  return (
    <div id={work.id.toString()} key={work.id} className="relative">
      <div className="relative h-fit w-full overflow-hidden rounded-lg ">
        {work.submission_link.includes(".pdf") ? (
          <iframe
            src={work.submission_link}
            width="100%"
            className="aspect-[3/4]"
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
        <div className="absolute top-2 right-2 w-full flex justify-between gap-2">
          {" "}
          <div className="ml-4 bg-white p-1.5 px-2 pr-3 shadow-md flex items-center gap-1 rounded-lg font-medium">
            <StarIcon className=" w-5 h-auto text-yellow-400" /> Votes:{" "}
            {work.total_votes}
          </div>
          <div className="bg-white rounded-lg p-1.5 shadow-md aspect-square">
            <Link href={`/art/${work.id}`}>
              <ArrowTopRightOnSquareIcon className="w-5 h-auto text-black" />
            </Link>
          </div>
        </div>

        <div className="relative mt-4">
          <h3 className="text-lg font-medium text-gray-900 truncate text-ellipsis">
            {work.title}
          </h3>
          <p className="text-sm text-black">{work.first_last_name}</p>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 text-ellipsis">
            {work.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtList;
