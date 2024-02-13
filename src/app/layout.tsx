import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quill.",
  description: "Chat with your PDF files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <Providers>
          <body className={cn("min-h-screen antialiased", poppins.className)}>
            <Navbar />
            {children}
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
