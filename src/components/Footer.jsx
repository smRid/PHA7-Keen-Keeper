import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Twitter",
    href: "#",
    icon: FaXTwitter,
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#244D3F] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center border-b border-white/10 pb-12 text-center">
          <aside className="mb-8 max-w-3xl">
            <h1 className="mb-6 text-6xl font-bold md:text-7xl">KeenKeeper</h1>
            <p className="mx-auto opacity-80">
              Your personal shelf of meaningful connections. Browse, tend, and
              nurture the relationships that matter most.
            </p>
          </aside>

          <nav aria-label="Social Links">
            <h2 className="mb-4 opacity-90 text-[18px]">Social Links</h2>
            <div className="flex items-center justify-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1C2333] shadow-lg transition-transform duration-200 hover:scale-110 md:h-8 md:w-8"
                  aria-label={label}
                >
                  <Icon className="text-[16px] md:text-[16px]" />
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm md:flex-row">
          <p className="opacity-60">
            &copy; 2026 KeenKeeper. All rights reserved.
          </p>
          <nav className="mt-2 flex gap-8 opacity-80 md:mt-0">
            <a className="cursor-pointer hover:text-white hover:underline">
              Privacy Policy
            </a>
            <a className="cursor-pointer hover:text-white hover:underline">
              Terms of Service
            </a>
            <a className="cursor-pointer hover:text-white hover:underline">
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
