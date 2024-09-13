import Redirect from "@/components/panel/Redirect";
import supabase from "@/lib/supabase";
import React from "react";

interface PageProps {
  params: {
    slug: string[];
  };
}

const page = async ({ params }: PageProps) => {
  const { data, error } = await supabase
    .from("panel")
    .select("*")
    .eq("id", params.slug[0]);
  return (
    <div className="bg-green-500 flex justify-center items-center w-dvw h-dvh">
      <Redirect panel={data?.[0]} />
      <h1 className="text-white text-7xl font-medium">
        {params.slug[0].slice(0, 5)}
      </h1>
    </div>
  );
};

export default page;
