import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function NavMenu() {
  return (
    <div className="flex gap-10 flex-col md:flex-row">
      <Link
        href="/"
        className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Home
      </Link>
      <Link
        href="/events"
        className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Events
      </Link>
      <Link
        href="/articles"
        className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Articles
      </Link>
      <Link
        href="/about"
        className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        About E-Cell
      </Link>
      <Link
        href="/gallery"
        className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
       E-Cell Gallery
      </Link>
      <Link
        href="/contactus"
        className="opacity-75 text-xs hover:opacity-100 ease-in-out duration-100 hover:underline underline-offset-4"
      >
        Contact Us
      </Link>
    </div>
  );
}

export default NavMenu;
