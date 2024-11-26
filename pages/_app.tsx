import "@/styles/globals.css"; // Import global styles
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar/navbar"; // Import the Navbar component

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Navbar /> {/* Add the Navbar here */}
      <Component {...pageProps} />
    </div>
  );
}
