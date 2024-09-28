import React from "react";
import BuildingABlueprint from "@/public/building-a-blueprint/poster.png";
import Image from "next/image";
import Blurbs from "@/components/workshops/Blurbs";
const snippet = `
This session is designed to guide attendees through various types of activism, providing tools to analyze real-life situations and create strategies for driving meaningful change. Participants will gain a comprehensive understanding of different protest forms, learning how to effectively organize and engage in activism. Additionally, the workshop will cover practical communication strategies essential for protest leadership and offer hands-on experience in crafting impactful action plans tailored to specific scenarios. Ideal for anyone looking to deepen their knowledge and practical skills in activism.
`;

const page = () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-[url('/building-a-blueprint/bg.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src={BuildingABlueprint}
        alt="Building A Blueprint"
        className="w-dvw relative h-auto max-h-dvh max-w-dvw object-contain"
      />
      <Blurbs title="Building A Blueprint" snippet={snippet} />
    </div>
  );
};

export default page;
