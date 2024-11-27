import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar/navbar"; 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Navbar /> {/* Add the Navbar here */}
      <Component {...pageProps} />
    </div>
  );
}
