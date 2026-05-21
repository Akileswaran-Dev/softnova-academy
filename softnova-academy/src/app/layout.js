import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Softnova Academy",
  description: "Unlock Your Potential Through Engaging and Learning with Softnova.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />

        <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}