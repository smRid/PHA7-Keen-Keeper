"use client";

import React, { useState } from "react";
import { RiCloseLine, RiHome2Line, RiMenu3Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="navbar relative border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto flex w-full items-center justify-between px-4 md:px-0">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={45}
              className="h-8 w-auto object-contain sm:h-9 md:h-10"
              priority
            />
          </Link>
        </div>
        <div className="hidden items-center md:flex">
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

        <div className="relative md:hidden">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:border-[#244D3F] hover:text-[#244D3F]"
          >
            {isMenuOpen ? (
              <RiCloseLine className="text-[26px]" />
            ) : (
              <RiMenu3Line className="text-[26px]" />
            )}
          </button>

          {isMenuOpen ? (
            <div
              id="mobile-navigation-menu"
              className="absolute right-0 top-[calc(100%+12px)] z-30 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, ind) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={ind}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-[#244D3F] text-white"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#244D3F]"
                      }`}
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
