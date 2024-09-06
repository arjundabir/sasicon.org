import Hero from "@/components/Hero";
import styles from "@/components/Hero.module.css";
import Drawer from "@/components/tickets/Drawer";
interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export default function Home({ searchParams }: HomeProps) {
  return (
    <main className={styles.background}>
      <Hero />
      <Drawer />
    </main>
  );
}
