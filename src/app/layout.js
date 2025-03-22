import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import SeasionProvider from "./components/SeasionProvider";
import Footer from "./components/Footer";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digitx SMM panel",
  description: "Digitx SMM panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SeasionProvider>
            <Nav />
            {children}
          </SeasionProvider>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
