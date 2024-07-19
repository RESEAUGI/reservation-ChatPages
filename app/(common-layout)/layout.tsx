"use client";
import Footer from "@/components/Footer";
import CommonHeader from "@/components/CommonHeader";
import HeaderTop from "@/components/HeaderTop";
import MobileMenu from "@/components/MobileMenu";
import Image from "next/image";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
{/*
Barre de Header
  */}
      <Image
        width={2366}
        height={126}
        src="/img/HeaderReservation.png"
        alt="image"
        className=""
                    />           
      {children}
    </>
  );
}
