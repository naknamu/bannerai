import { Inter, Patua_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });
const patua_one = Patua_One({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "BannerAI",
  description: "Create beautiful graphics in one click",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={patua_one.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
