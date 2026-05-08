import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Softnova Academy",
  description: "Unlock Your Potential Through Engaging and Learning with Softnova.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
