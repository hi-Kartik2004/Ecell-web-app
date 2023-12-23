import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function NavMenu() {
  return (
    <div className="flex gap-10 flex-col md:flex-row">
      <Link
        href="#"
        className="opacity-75 text-sm hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Home
      </Link>
      <Link
        href="#"
        className="opacity-75 text-sm hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Home
      </Link>
      <Link
        href="#"
        className="opacity-75 text-sm hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Home
      </Link>
      <Link
        href="#"
        className="opacity-75 text-sm hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Home
      </Link>
      <Link
        href="#"
        className="opacity-75 text-sm hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Home
      </Link>
    </div>
  );
}

export default NavMenu;
