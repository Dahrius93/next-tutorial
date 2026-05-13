import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Inconsolata, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
// const inconsolata = Inconsolata({ subsets: ["latin"] });
// const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="max-w-3xl mx-auto py-10">{children}</main>
      </body>
    </html>
  );
}
