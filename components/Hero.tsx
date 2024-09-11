import Image from "next/image";
import OVPTL from "@/public/uci-ovptl.png";
import NCFSCE from "@/public/uci-ncfsce.png";
import SASI from "@/public/logo.png";

export default function Hero() {
  return (
    <div className="flex flex-col justify-between h-full py-8 px-4 overflow-clip">
      <div className="mt-8">
        <Image src={SASI} alt="SASI" className="w-24" />
        <h2 className="text-3xl text-white ">SASI presents:</h2>
        <h1 className="text-5xl text-white font-medium w-full">SASICon 2024</h1>
      </div>
      <div>
        <h2 className=" text-white ">Presented by:</h2>
        <Image src={OVPTL} alt="OVPTL" className="w-1/2 max-w-xs" />
        <Image src={NCFSCE} alt="NCFSCE" className="w-1/2 max-w-xs" />
      </div>
    </div>
  );
}
