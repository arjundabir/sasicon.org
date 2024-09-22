import ArtList from "@/components/art/ArtList";
import { getWorks } from "@/data/works";
import getUser from "@/lib/get-user";
import getUserId from "@/lib/get-userid";

export default async function page() {
  const userId = getUserId();
  const [works, user] = await Promise.all([getWorks(), getUser(userId!)]);
  return <ArtList works={works} user={user} />;
}
