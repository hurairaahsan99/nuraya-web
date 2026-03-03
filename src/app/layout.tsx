import type { Metadata } from "next";
import "./globals.css";
import ConditionalNav from "@/Sub-Components/ConditionalNav";
import Footer from "@/Sub-Components/Footer";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Nuraya",
  description: "Co-own Luxury Hospitality Across Africa.",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;500&family=Playfair+Display:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F1EFE0]" suppressHydrationWarning>
        <Providers>
          <ConditionalNav />
          <main className="relative flex flex-col">
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
