import Logo from "@/public/logo.png";
import Image from "next/image";
import InputForm from "@/components/welcome/InputForm";

export default function Input() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image alt="SASI" src={Logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome To SASICon!
        </h2>
        <p className="text-sm text-gray-500">
          Complete this check in form to get your first raffle ticket.
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <InputForm />

        <p className="mt-10 text-center text-sm text-gray-500">
          Already completed this form?{" "}
          <a
            href="callto:+19498727095"
            className="font-semibold leading-6 text-blue-800 hover:text-blue-800"
          >
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
}
