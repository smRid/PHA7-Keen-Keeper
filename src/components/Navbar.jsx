"use client";

import React from "react";
import { RiHome2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      path: "/",
      text: "Home",
      icon: <RiHome2Line className="text-2xl" />,
    },
    {
      path: "/timeline",
      text: "Timeline",
      icon: (
        <Image
          src="/clock.png"
          alt="clock"
          width={22}
          height={22}
          className="w-auto h-5 object-contain"
        />
      ),
    },
    {
      path: "/stats",
      text: "Stats",
      icon: (
        <Image
          src="/ChartLine.png"
          alt="ChartLine"
          width={22}
          height={22}
          className="w-auto h-5 object-contain"
        />
      ),
    },
  ];
  return (
    <div className="navbar bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-0">
        <div className="navbar-start">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={45}
              className="w-auto h-10 object-contain"
              priority
            />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-4">
            {navItems.map((item, ind) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={ind}
                  href={item.path}
                  className={`flex items-center justify-center gap-2 px-4 h-[44px] rounded-xl font-medium transition-colors text-[18px] ${
                    isActive
                      ? "bg-[#244D3F] text-white"
                      : "text-slate-500 hover:text-[#244D3F] hover:bg-slate-50"
                  }`}
                >
                  {item.icon}
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
