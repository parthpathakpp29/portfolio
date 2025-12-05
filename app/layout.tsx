import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import IntroLoader from "@/components/intro-loader";
import AnimatedBackground from "@/components/animated-background";
import ChatWidget from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Parth | Personal Portfolio",
  description: "Parth is a full-stack developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-900 text-gray-50 relative pt-28 sm:pt-36`}
      >
   
        <IntroLoader />
        
        <AnimatedBackground />

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
           <ChatWidget />
            <Toaster position="top-right" />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}