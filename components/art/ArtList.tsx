"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Alert from "./Alert";
import ScrollUpButton from "./ScrollUpButton";
import Link from "next/link";
import { Work } from "@/types/work";

type ArtListProps = {
  works: Work[] | undefined;
};

const ArtList = ({ works }: ArtListProps) => {
  const [selectedArt, setSelectedArt] = useState<number[]>([]);
  const [showAlert, setShowAlertState] = useState(false);

  const handleVote = (id: number) => {
    if (selectedArt.includes(id)) {
      setSelectedArt(selectedArt.filter((workId) => workId !== id));
      window.location.href = `/art#${id}`;
    } else {
      if (selectedArtCount < 2) {
        setSelectedArt([...selectedArt, id]);
      } else {
        setShowAlert();
      }
    }
  };

  const selectedArtCount = useMemo(() => {
    return selectedArt.length;
  }, [selectedArt]);

  const setShowAlert = useCallback(() => {
    setShowAlertState(true);
    setTimeout(() => {
      setShowAlertState(false);
    }, 3000);
  }, [selectedArt]);

  return (
    <div className="bg-white">
      <ScrollUpButton visible={selectedArtCount > 0} />
      <Alert show={showAlert} />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Image src={Logo} alt="Certificate" width={80} height={80} />
        <h2 className="text-xl font-semibold text-gray-900">
          Vote for your favorite art work.
        </h2>
        <p className="mt-1 text-md leading-6 text-gray-600">
          {selectedArtCount === 1
            ? `You can vote for ${2 - selectedArtCount} more art work.`
            : selectedArtCount === 2
            ? `You can no longer vote for more art works. Remove votes to vote for more art works.`
            : `You can vote for ${2 - selectedArtCount} more art works.`}
        </p>

        {selectedArtCount > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Selected Art Works
            </h2>
            {works
              ?.filter((work) => selectedArt.includes(work.id))
              .map((work) => {
                const selected = selectedArt.includes(work.id);
                return (
                  <>
                    <div
                      id={work.id.toString()}
                      key={work.id}
                      className="relative"
                    >
                      <div className="relative h-fit w-full overflow-hidden rounded-lg ">
                        <Image
                          alt={work.title}
                          src={work.submission_link}
                          className="h-full w-full object-contain object-center"
                          width={500}
                          height={500}
                          loading="lazy"
                        />
                      </div>
                      <div className="relative mt-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {work.title}
                        </h3>
                        <p className="text-sm text-black">
                          {work.first_last_name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2 text-ellipsis">
                          {work.description}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col gap-2">
                        <Link
                          href={`/art/${work.id}`}
                          className="w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 bg-gray-100 hover:bg-gray-200"
                        >
                          View More
                        </Link>
                        <button
                          onClick={() => handleVote(work.id)}
                          className={`w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 bg-yellow-100 hover:bg-yellow-200`}
                        >
                          Add to Favorites
                        </button>
                        <button
                          onClick={() => handleVote(work.id)}
                          className={`w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 ${
                            selected
                              ? "bg-red-200 hover:bg-red-300"
                              : "bg-green-100 hover:bg-green-200"
                          }`}
                        >
                          {selected ? "Remove Vote" : "Vote"}
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          <h2 className="text-xl font-semibold text-gray-900">All Art Works</h2>
          {works?.map((work) => {
            const selected = selectedArt.includes(work.id);
            return (
              <>
                <div id={work.id.toString()} key={work.id} className="relative">
                  <div className="relative h-fit w-full overflow-hidden rounded-lg ">
                    <Image
                      alt={work.title}
                      src={work.submission_link}
                      className="h-full w-full object-contain object-center"
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {work.title}
                    </h3>
                    <p className="text-sm text-black">{work.first_last_name}</p>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2 text-ellipsis">
                      {work.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <Link
                      href={`/art/${work.id}`}
                      className="w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 bg-gray-100 hover:bg-gray-200"
                    >
                      View More
                    </Link>
                    <button
                      onClick={() => handleVote(work.id)}
                      className={`w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 bg-yellow-100 hover:bg-yellow-200`}
                    >
                      Save for later
                    </button>
                    <button
                      onClick={() => handleVote(work.id)}
                      className={`w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 ${
                        selected
                          ? "bg-red-200 hover:bg-red-300"
                          : "bg-green-100 hover:bg-green-200"
                      }`}
                    >
                      {selected ? "Remove Vote" : "Vote"}
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtList;
