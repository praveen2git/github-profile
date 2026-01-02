import { Outfit } from "next/font/google";
import "./globals.css";

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
      <body className={outfit.variable}>
        {children}
      </body>
    </html>
  );
}
