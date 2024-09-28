"use client";
import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./Welcome.module.css";
import corner from "@/public/welcome-corner.png";
import Image from "next/image";
const cranberry = localFont({
  src: "../public/fonts/cranberry.woff2",
  display: "swap",
});

const hero = localFont({
  src: "../public/fonts/hero.woff2",
  display: "swap",
});

const isWithinTimeFrame = () => {
  const now = new Date();

  // PST is UTC-7 during daylight saving time
  const targetDate = new Date("2024-09-28T09:30:00-07:00");
  const endDate = new Date("2024-09-28T10:15:00-07:00");

  return now >= targetDate && now <= endDate;
};

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(isWithinTimeFrame());

  useEffect(() => {
    const interval = setInterval(() => {
      setShowWelcome(isWithinTimeFrame());
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    showWelcome && (
      <div className={`${cranberry.className}`}>
        <div className="absolute inset-0 h-dvh w-dvw flex items-center justify-center bg-[url(/welcome-bg.png)] bg-cover bg-center z-1">
          <Image
            src={corner}
            alt="corner"
            className="absolute top-0 left-0 w-1/4 h-auto"
          />
          <Image
            src={corner}
            alt="corner"
            className="absolute bottom-0 right-0 w-1/4 h-auto rotate-180"
          />
          <div className="relative w-full text-[15dvw] text-center">
            <h1 className="font-bold text-yellow-600 ">
              {Array.from("Welcome").map((letter, index) => (
                <span
                  key={index}
                  className={`${styles.bounce}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <h1 className={`font-bold ${styles.shadow} text-yellow-500 w-full`}>
              {Array.from("Welcome").map((letter, index) => (
                <span
                  key={index}
                  className={styles.bounce}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <p
              className={`${hero.className} text-white text-sm w-fit bg-blue-800 mx-auto`}
            >
              Conference will start at 10:15am
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Welcome;
