import ArtList from "@/components/art/ArtList";
import { getWorks } from "@/data/works";

export default async function page() {
  const works = await getWorks();
  return <ArtList works={works} />;
}
