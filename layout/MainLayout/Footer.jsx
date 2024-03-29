"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie, getCookies } from "cookies-next";
import { TOKEN_KEY } from "../../utils/constants";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();


  return (
    <p>Footer</p>
  );
};

export default Footer;
