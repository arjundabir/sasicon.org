import RaffleTickets from "@/components/RaffleTickets";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <RaffleTickets />
    </main>
  );
}
