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
import { NavMenu } from "./NavMenu";
import { ModeToggle } from "./ThemeToggleBtn";
import { Button } from "./ui/button";

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="muted">
          <HamburgerMenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ecell Menu</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            suscipit quod qui.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 items-start my-4">
          <NavMenu />
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
