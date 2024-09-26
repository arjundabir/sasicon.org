import Nav from "@/components/admin/Nav";
import Drawer from "@/components/tickets/Drawer";
import getUser from "@/lib/get-user";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = cookies().get("userId")?.value;
  const user = await getUser(userId || "");
  return (
    <main>
      {children}
      {userId && <Drawer userId={userId} />}
      {user?.is_admin && <Nav />}
    </main>
  );
}
