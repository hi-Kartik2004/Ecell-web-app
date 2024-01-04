import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ThemeToggleBtn";
import { Button } from "./ui/button";
import NavMenu from "./NavMenu";
import data from "@/app/data";
import Link from "next/link";

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="muted">
          <HamburgerMenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className={`max-w-[250px] px-1 `} side="left">
        <SheetHeader>
          <SheetTitle className="text-center">{data?.clubName} Menu</SheetTitle>
          <SheetDescription className="text-xs text-center">
            {data?.mobileMenuDescription}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 items-center my-10 text-center">
          <div className="flex gap-10 flex-col md:flex-row">
            {data.navbarLinks.map((link, index) => (
              <SheetClose key={link} asChild>
                <Link
                  href={link.link}
                  className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>

        <div className="absolute w-full bottom-4 flex flex-wrap justify-center items-center">
          <p className="text-xs text-center flex-wrap flex">
            &copy; {new Date().getFullYear()} {data?.footText}.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
