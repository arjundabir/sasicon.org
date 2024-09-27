import CodeorQuestion from "@/components/panel/CodeorQuestion";
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
    <div className="bg-[#f2c161] flex flex-col justify-center items-center w-dvw h-dvh">
      {/* <Redirect panel={data?.[0]} /> */}

      <CodeorQuestion data={data?.[0]} />
    </div>
  );
};

export default page;
