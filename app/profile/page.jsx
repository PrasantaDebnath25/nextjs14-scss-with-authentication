"use client";
import useAuth from "../../hooks/useAuth";
import Image from "next/image";
import MainLayout from "../MainLayout";

export default function RegisterPage() {
  const { user, Logout } = useAuth();

  return (

    <MainLayout>
      

      <div className="main_body">
        Main Content
      </div>

      
    </MainLayout>


  );
}