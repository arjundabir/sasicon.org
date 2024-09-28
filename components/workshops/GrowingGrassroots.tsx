import React from "react";
import styles from "./growing-grassroots.module.css";
import GrowingGrassrootsText from "@/public/growing-grassroots/text.png";
import FistAndGrass from "@/public/growing-grassroots/fist-and-grass.png";
import SASICON24 from "@/public/growing-grassroots/sasicon-24.png";
import Image from "next/image";
import Blurbs from "./Blurbs";

const snippet = `
This workshop is designed to equip activists with the skills to build grassroots movements. Participants will learn how to identify and mobilize community leaders, develop effective messaging, and create strategies for grassroots mobilization. The workshop will also provide tools for organizing and engaging in grassroots activism, including how to build a strong network of supporters and how to effectively communicate with them. Ideal for anyone looking to deepen their knowledge and practical skills in activism.

`;

const GrowingGrassroots = () => {
  return (
    <div className={`${styles.background} overflow-clip`}>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full">
        <Image src={GrowingGrassrootsText} alt="Growing Grassroots" />
        <Image src={SASICON24} alt="SASICON24" className="w-40 p-4" />
      </div>
      <div className="absolute -bottom-20 left-1/3 transform -translate-x-1/2 w-[150dvw]">
        <Image src={FistAndGrass} alt="Fist and Grass" className="w-full" />
      </div>
      <Blurbs title="Growing Grassroots" snippet={snippet} />
    </div>
  );
};

export default GrowingGrassroots;
