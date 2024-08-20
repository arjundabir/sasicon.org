import Button from "@/components/tickets/Button";
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
      <Button tickets={tickets?.value as string} />
    </main>
  );
}
