// "use client";
import "../app/ui/global.scss";
import '../scss/main.scss';
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { PRODUCT_LINK, PROFILE_LINK } from "../utils/constants";

export const metadata = {
  title: "Nextjs-Auth",
  // description: "Welcome to Next.js",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/apple.svg',
        href: '/images/apple.svg',
      },
      // {
      //   media: '(prefers-color-scheme: dark)',
      //   url: '/images/icon.png',
      //   href: '/images/icon-dark.png',
      // },
    ],
  },
};

export default function SiteLayout({
  children,
}
) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if(isAuthenticated){
      router.push(PRODUCT_LINK);
    }
  }, []);
  return (
    <>{children}</>
  );
}
