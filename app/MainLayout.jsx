// "use client";
import "../app/ui/global.scss";
import '../scss/main.scss';
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { PROFILE_LINK } from "../utils/constants";
import Header from "../layout/MainLayout/Header";
import Footer from "../layout/MainLayout/Footer";

export const metadata = {
  title: "Nextjs-Auth",
  // description: "Welcome to Next.js",
};

export default function MainLayout({
  children,
}
) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  // useEffect(() => {
  //   if(isAuthenticated){
  //     router.push(PROFILE_LINK);
  //   }
  // }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
