"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NavMenu } from "./NavMenu";
import { ModeToggle } from "./ThemeToggleBtn";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { Button } from "./ui/button";

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const delta = 30; // Adjust this value to your desired sensitivity

      if (Math.abs(prevScrollPos - currentScrollPos) > delta) {
        setIsVisible(
          prevScrollPos > currentScrollPos || currentScrollPos < delta
        );
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`w-full z-10 ${
        isVisible ? "bg-opacity-70 backdrop-blur-xl" : "hidden"
      }`}
      style={{ position: "fixed", top: 0 }}
    >
      <div className="flex container flex-grow py-2 px-4 items-center justify-between relative ">
        <div className="flex items-center">
          <div className="md:hidden block">
            <MobileMenu />
          </div>

          <Link href="/" className="flex gap-2 items-center">
            <Image
              src={"/ecell-no-bg.png"}
              width={50}
              height={50}
              alt={"logo"}
            />
            <span className="text-xl font-bold hidden md:block">E-Cell</span>
          </Link>
        </div>

        <div className="md:flex hidden items-center justify-between">
          <div className="absolute lg:left-[50%] lg:translate-x-[-50%] md:left-[60%] md:translate-x-[-60%]">
            <NavMenu />
          </div>

          <ModeToggle />
        </div>

        <Button variant="secondary" className="border">
          Sign In
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
