import React, { useState } from "react";
import {
  Sheet,
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
  const [showSlider, setShowSlider] = useState(false);

  return (
    <Sheet open={showSlider}>
      <SheetTrigger asChild>
        <Button
          variant="muted"
          onClick={() => {
            setShowSlider(!showSlider);
          }}
        >
          <HamburgerMenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className={`max-w-[250px] px-1 `} side="left">
        <SheetHeader>
          <SheetTitle>{data?.clubName} Menu</SheetTitle>
          <SheetDescription className="text-xs">
            {data?.mobileMenuDescription}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 items-center my-10 text-center">
          <div className="flex gap-10 flex-col md:flex-row">
            {data.navbarLinks.map((link, index) => (
              <Link
                href={link.link}
                className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
                onClick={() => {
                  setShowSlider(false);
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 flex flex-wrap justify-center mx-2">
          <p className="text-xs text-center flex-wrap flex">
            &copy; {new Date().getFullYear()} {data?.footText}.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
