import React from "react";
import style from "./pioneer-of-protest.module.css";
import Logo from "@/public/logo.png";
import Image from "next/image";

const PioneerOfProtest = () => {
  return (
    <div className="h-dvh w-dvw">
      <div className={style.background}>
        <Image src={Logo} alt="Logo" width={100} height={100} />
        <h1 className="text-yellow-500 font-bold text-lg">
          Who is a Pioneer of Protest?
        </h1>
      </div>
    </div>
  );
};

export default PioneerOfProtest;
