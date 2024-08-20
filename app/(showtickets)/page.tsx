import Hero from "@/components/Hero";

interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export default function Home({ searchParams }: HomeProps) {
  return (
    <main className="">
      <Hero />
    </main>
  );
}
