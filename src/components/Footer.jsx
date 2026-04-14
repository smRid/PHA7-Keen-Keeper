import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
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

  return (
    <footer className="bg-[#244D3F] text-[#FFFFFF] p-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center border-b border-white/10 pb-12">
          <aside className="mb-8">
            <h1 className="mb-6 text-6xl md:text-7xl font-bold">KeenKeeper</h1>
            <p className="opacity-80 mx-auto ">
              Your personal shelf of meaningful connections. Browse, tend, and
              nurture the relationships that matter most.
            </p>
          </aside>

          <nav>
            <h2 className="mb-3 opacity-90">Social Links</h2>
            <div className="flex justify-center items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-[#1C2333] shadow-lg transition-transform duration-200 hover:scale-110 md:h-8 md:w-8"
                  aria-label={label}
                >
                  <Icon className="text-[16px] md:text-[16px]" />
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm ">
          <p className="opacity-60">© 2026 KeenKeeper. All rights reserved.</p>
          <nav className="flex gap-8 mt-6 md:mt-0 opacity-80">
            <a className="hover:text-white hover:underline cursor-pointer">
              Privacy Policy
            </a>
            <a className="hover:text-white hover:underline cursor-pointer">
              Terms of Service
            </a>
            <a className="hover:text-white hover:underline cursor-pointer">
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
