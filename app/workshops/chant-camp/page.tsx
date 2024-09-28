import React from "react";
import ChantCamp from "@/public/chant-camp/poster.png";
import Image from "next/image";
import Blurbs from "@/components/workshops/Blurbs";

const snippet = `
Blurb for chant camp if you haven’t gotten it already : Chant Camp workshop will be hosted by SASI members, Nghia and Dhriti, and UCI Faculty member, Bryan Reynolds. Chant camp is intended to educate attendees on chant design, appropriate chants, how to lead chants, and how to maintain chants while at a protest. At the end of the workshop, attendees should be introduced to
Purpose of chants at protests
Skills necessary for creating and brainstorming appropriate chants for causes and situations
Communication required while at a protest to lead and share chants
Breath support to support chanting
`;

const page = () => {
  return (
    <div className="bg-[#f2c161] h-dvh w-dvw flex justify-center items-center">
      <Image src={ChantCamp} alt="Chant Camp" className="w-dvw" />
      <Blurbs title="Chant Camp" snippet={snippet} />
    </div>
  );
};

export default page;
