import Image from "next/image";
import React from "react";
import { NavMenu } from "./NavMenu";
import { ModeToggle } from "./ThemeToggleBtn";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

function Navbar() {
  return (
    <nav className=" border-b-2 fixed top-0 w-full z-10 bg-background/70 backdrop-blur-md">
      <div className="flex container flex-grow py-2 px-4 items-center justify-between relative ">
        <Link href="/" className="flex gap-4 items-center">
          <Image src={"/ecell-no-bg.png"} width={50} height={50} alt={"logo"} />
          <span className="text-2xl font-bold">E-Cell</span>
        </Link>

        <div className="md:flex hidden items-center justify-between">
          <div className="absolute lg:left-[50%] lg:translate-x-[-50%] md:left-[60%] md:translate-x-[-60%]">
            <NavMenu />
          </div>

          <ModeToggle />
        </div>

        <div className="md:hidden block">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
