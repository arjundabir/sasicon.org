import React from "react";
import style from "./pioneer-of-protest.module.css";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Blurbs from "./Blurbs";
const snippet = `
This workshop is a Jeopardy game about pioneers of protest. Participants will engage in a fun and educational game where they will answer questions related to historical and contemporary figures who have made significant contributions to social justice movements. The game aims to increase awareness and knowledge about these important individuals and their impact on society.

`;

const PioneerOfProtest = () => {
  return (
    <div className="h-dvh w-dvw">
      <div className={style.background}>
        <Image src={Logo} alt="Logo" width={100} height={100} />
        <h1 className="text-yellow-500 font-bold text-lg">
          Who is a Pioneer of Protest?
        </h1>
      </div>
      <Blurbs title="Pioneer of Protest" snippet={snippet} />
    </div>
  );
};

export default PioneerOfProtest;
