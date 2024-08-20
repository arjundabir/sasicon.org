import RaffleTickets from "@/components/RaffleTickets";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tickets = cookies().get("raffleTickets");
  return (
    <main>
      {children}
      <RaffleTickets tickets={tickets?.value as string} />
    </main>
  );
}
