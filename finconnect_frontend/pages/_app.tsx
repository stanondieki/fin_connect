import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react"; 
import "@/utils/language/i18n";
import i18n from "i18next"; 
import { useEffect } from "react";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    console.log("Current language:", i18n.language);
  },[]);

  const excludeNavbarRoutes = [
    "/dash/dashboard",
    "/expenditure/breakdown",
    "/Auth/signin",
    "/Auth/signup",
    "/Auth/forgotpassword",
  ];

  const shouldRenderNavbar = !excludeNavbarRoutes.includes(router.pathname);

  return (
    <SessionProvider session={pageProps.session}>  {/* Wrap the app with SessionProvider */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        {/* {shouldRenderNavbar && <Navbar />} */}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}