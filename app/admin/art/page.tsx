import ArtList from "@/components/admin/art/ArtList";
import supabase from "@/lib/supabase";
import { Work } from "@/types/work";

type WorkVote = {
  work_id: number;
  total_votes: number;
};

export default async function page() {
  const {
    data: workVotes,
    error: workVotesError,
  }: { data: WorkVote[] | null; error: any } = await supabase
    .from("work_votes")
    .select("*");
  const {
    data: works,
    error: worksError,
  }: { data: Work[] | null; error: any } = await supabase
    .from("works")
    .select("*");

  if (workVotesError) {
    console.error("Error fetching view:", workVotesError);
  }

  if (worksError) {
    console.error("Error fetching works:", worksError);
  }
  let sortedWorks: (Work & { total_votes: number })[] = [];
  if (workVotes && works) {
    sortedWorks = works
      .map((work) => {
        const total_votes =
          workVotes.find((vote) => vote.work_id === work.id)?.total_votes || 0;
        return { ...work, total_votes };
      })
      .sort((a, b) => b.total_votes - a.total_votes);
  }

  return (
    <div>
      <ArtList works={sortedWorks} />
    </div>
  );
}
