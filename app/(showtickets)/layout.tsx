import Drawer from "@/components/tickets/Drawer";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = cookies().get("userId")?.value;
  return (
    <main>
      {children}
      {userId && <Drawer userId={userId} />}
    </main>
  );
}
