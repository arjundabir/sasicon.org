import React from "react";
import AdvocacyInAction from "@/public/advocacy-in-action/poster.png";
import Image from "next/image";
import PollEvIcon from "@/public/advocacy-in-action/pollev-logo.png";
import Blurbs from "@/components/workshops/Blurbs";

const snippet = `
Advocacy in Action will be a one hour workshop available in ALP 1600. The workshop will cover the basic needs and health considerations for attending a protest, communication strategies when facing opposing groups while at a protest, and important information to consider regarding the rights and process of potential arrest at a protest. The workshop may contain triggering and/or sensitive information for some participants. Participant engagement will be provided through polleverywhere questions, a hands-on activity, and an opportunity to practice self defense. 
Planned topics include basic needs, first aid, non-violent self defense, escalation tactics, arrest expectations, and protest rights for DACA and Dreamers.
`;
const page = () => {
  return (
    <div className="overflow-clip">
      <div className="h-dvh w-dvw flex justify-center items-center bg-gradient-to-b from-[#CCC1D5] to-[#413A99]">
        <Image
          src={AdvocacyInAction}
          alt="Advocacy In Action"
          className="w-dvw"
        />
        <div className="absolute bottom-3 right-3 bg-white rounded-md p-2">
          <a href="https://pollev.com/jadenettrour">
            <Image src={PollEvIcon} alt="PollEv" className="w-20 h-20" />
          </a>
        </div>
      </div>
      <Blurbs title="Advocacy In Action" snippet={snippet} />
    </div>
  );
};

export default page;
