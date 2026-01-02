import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "GitHub Tools: Readme & Trophy Generator",
  description: "Generate beautiful GitHub Readmes and Trophies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.variable} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1 }}>
            {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
