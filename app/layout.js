import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import './globals.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Prathamesh Patil - Software Developer",
  description:
    "This is the portfolio of Prathamesh Patil. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>{`
          html, body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
            margin: 0;
            padding: 0;
          }
          
          body {
            max-width: 100vw;
          }

          main {
            overflow-x: hidden;
            position: relative;
            width: 100%;
          }
        `}</style>
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white overflow-hidden">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
