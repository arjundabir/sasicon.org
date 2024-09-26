import React from "react";
import { getWorks } from "@/data/works";
import Image from "next/image";
import Link from "next/link";
import VoteButton from "@/components/art/VoteButton";
import getUserId from "@/lib/get-userid";
import getUser from "@/lib/get-user";
import VoteContainer from "@/components/art/VoteContainer";

interface PageProps {
  params: {
    slug: string[];
  };
}

const page = async ({ params }: PageProps) => {
  const userId = await getUserId();
  const [user, works] = await Promise.all([getUser(userId!), getWorks()]);
  const selectedWork = works?.find(
    (work) => work.id === parseInt(params.slug[0])
  );
  if (!selectedWork) {
    return <div>Work not found</div>;
  }
  return (
    <div
      id={selectedWork.id.toString()}
      className="relative p-4 flex flex-col justify-center min-h-dvh"
    >
      <h3 className="text-2xl font-bold text-gray-900">{selectedWork.title}</h3>
      {selectedWork.choice !== "anonymous" && (
        <p className="text-sm text-gray-500 mb-2">
          {selectedWork.first_last_name}
        </p>
      )}
      <div className="relative h-fit w-full overflow-hidden rounded-lg ">
        {selectedWork.submission_link.includes(".pdf") ? (
          <iframe
            src={selectedWork.submission_link}
            width="100%"
            className={`h-full ${
              selectedWork.title.toLowerCase().includes("triptych")
                ? "aspect-[1/2]"
                : "aspect-[3/4]"
            }`}
            title="PDF Viewer"
          />
        ) : (
          <Image
            alt={selectedWork.title}
            src={selectedWork.submission_link}
            className="h-full w-full object-contain object-center"
            width={500}
            height={500}
            priority
          />
        )}
      </div>
      <div className="relative mt-4">
        <p className="mt-1 text-sm text-gray-500">{selectedWork.description}</p>
      </div>
      <div className="mt-6 flex gap-2">
        <VoteContainer vote={user?.vote} bookmarkVisible={false}>
          <Link
            href={`/art#${selectedWork.id}`}
            className="w-full relative flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-sm font-medium text-gray-900  transition-all duration-300 bg-gray-100 hover:bg-gray-200"
          >
            Go Back
          </Link>
          <VoteButton id={selectedWork.id} />
        </VoteContainer>
      </div>
    </div>
  );
};

export default page;
