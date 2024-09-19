import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MicrosoftClarity } from "@/components/scripts/MicrosoftClarity";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SASICon 2024",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <GoogleAnalytics gaId={"G-PRSN6DHRN8"} />
        <MicrosoftClarity clarityId={"o5isantbxj"} />
      </body>
    </html>
  );
}
