import React from "react";
import styles from "./growing-grassroots.module.css";
import GrowingGrassrootsText from "@/public/growing-grassroots/text.png";
import FistAndGrass from "@/public/growing-grassroots/fist-and-grass.png";
import SASICON24 from "@/public/growing-grassroots/sasicon-24.png";
import Image from "next/image";

const GrowingGrassroots = () => {
  return (
    <div className={styles.background}>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full">
        <Image src={GrowingGrassrootsText} alt="Growing Grassroots" />
        <Image src={SASICON24} alt="SASICON24" className="w-40 p-4" />
      </div>
      <div className="absolute -bottom-20 left-1/3 transform -translate-x-1/2 w-[150dvw]">
        <Image src={FistAndGrass} alt="Fist and Grass" className="w-full" />
      </div>
    </div>
  );
};

export default GrowingGrassroots;
