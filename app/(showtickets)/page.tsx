import Hero from "@/components/Hero";
import styles from "@/components/Hero.module.css";
interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export default function Home({ searchParams }: HomeProps) {
  return (
    <main className={styles.background}>
      <Hero />
    </main>
  );
}
