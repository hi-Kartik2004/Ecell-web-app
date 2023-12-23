import React from "react";
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

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="muted">
          <HamburgerMenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[250px] px-1" side="left">
        <SheetHeader>
          <SheetTitle>Ecell Menu</SheetTitle>
          <SheetDescription className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            suscipit quod qui.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 items-center my-10 ">
          <NavMenu />
        </div>

        <div className="fixed bottom-4 flex justify-center ml-2">
          <p className="text-xs text-center">
            &copy; {new Date().getFullYear()} Ecell UVCE. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
