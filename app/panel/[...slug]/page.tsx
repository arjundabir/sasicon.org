import React from "react";

interface PageProps {
  params: {
    slug: string[];
  };
}

const page = ({ params }: PageProps) => {
  return <div>{params.slug[0]}</div>;
};

export default page;
