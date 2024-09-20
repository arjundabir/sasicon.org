import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import InputForm from "./InputForm";

const Input = () => {
  return (
    <div className="px-4 py-8">
      <Image src={Logo} alt="Certificate" width={80} height={80} />
      <h2 className="text-xl font-semibold leading-7 text-gray-900">
        Interested in our Certificate?
      </h2>
      <p className="mt-1 text-md leading-6 text-gray-600">
        Fill out the form below to enroll in our certificate program.
      </p>
      <hr className="my-4 w-3/4" />
      <InputForm />
    </div>
  );
};

export default Input;
