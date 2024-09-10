import type { Metadata } from "next";
import { lato } from '@/font/google'
import "./globals.css";
import ProvidersTanstack from "@/context/ProvidersTanstack";
import FooterGeneral from "@/components/containers/footer-general";

export const metadata: Metadata = {
  title: "Retrueque",
  description: "Retrueque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ProvidersTanstack>
        {children}
        <FooterGeneral/>
      </ProvidersTanstack>
      </body>
    </html>
  );
}
