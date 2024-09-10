import type { Metadata } from "next";
import {lato } from '@/font/google'
import "./globals.css";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import FooterGeneral from "@/components/containers/footer-general";

export const metadata: Metadata = {
  title: "Retrueque",
  description: "Retrueque",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <SessionAuthProvider session={session}>
      <html lang="en">
        <body className={lato.className}>
          {children}
          <FooterGeneral/>
        </body>
      </html>
    </SessionAuthProvider>
  );
}
