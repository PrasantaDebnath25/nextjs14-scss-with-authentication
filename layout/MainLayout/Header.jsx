"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie, getCookies } from "cookies-next";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { LOGIN_LINK, PRODUCT_CART_LINK, TOKEN_KEY } from "../../utils/constants";
import Image from "next/image";
import UserIcon from '../../public/images/user_icon.svg'
import Link from "next/link";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const router = useRouter();
  const { user, Logout } = useAuth();


  return (
    <p>Header

{user ?
                <li className="profile_dropdwn"><Image src={UserIcon} />
                  <div className="account_info">
                    <span>{user?.email ?? ""}</span>
                    <button className="logout_btn" onClick={Logout}><span>Logout </span><ExitToAppRoundedIcon /></button>
                  </div>
                </li>
                :
                <li className="profile_dropdwn"><Link href={LOGIN_LINK}>Login</Link></li>
                }

    </p>
  );
};

export default Header;
