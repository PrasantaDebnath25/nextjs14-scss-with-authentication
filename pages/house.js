import Image from "next/image";
// import { Inter } from 'next/font/google'
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ['latin'] })

export default function House() {
  const router = useRouter();
  const handleClick = (e, name) => {
    e.preventDefault();
    router.push("/" + name);
  };
  return (
    <>House</>
  );
}
