import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import data from "@/app/data";

function NavMenu() {
  return (
    <div className="flex gap-10 flex-col md:flex-row">
      {data.navbarLinks.map((link, index) => (
        <Link
          href={link.link}
          className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default NavMenu;
