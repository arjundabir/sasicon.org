import React from "react";
import AnteaterDemonstrationArchive from "@/public/anteater-demonstration-archive/ada.png";
import Image from "next/image";
import Blurbs from "@/components/workshops/Blurbs";
import Background from "@/public/anteater-demonstration-archive/bg.png";

const snippet = `
UCI was founded in an era of protest — student protesters of the Vietnam War laid the groundwork for student protesting at UCI. Since then, UCI has experienced rallies, marches, sit-ins, walk-outs, amongst other forms of protest on its grounds  which has led to awareness within the student body as well as the founding of UCI’s very own Asian American Studies Department. In this workshop, we are going to go through time and highlight some key demonstrations UCI students have held on campus, their outcomes, and how they impact protests today. Workshop-goers will also be introduced to current UCI administration policies on protesting on-campus and what that means for student movements.

`;

const page = () => {
  return (
    <div
      className="h-dvh w-dvw flex justify-center items-center relative bg-cover bg-center bg-no-repeat overflow-clip"
      style={{ backgroundImage: `url(${Background.src})` }}
    >
      <Image
        src={AnteaterDemonstrationArchive}
        alt="Anteater Demonstration Archive"
        className="w-dvw relative h-auto max-h-dvh max-w-dvw object-contain"
      />
      <Blurbs title="Anteater Demonstration Archive" snippet={snippet} />
    </div>
  );
};

export default page;
