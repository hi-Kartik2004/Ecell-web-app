"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { BiCross, BiMenu, BiWindowClose } from "react-icons/bi";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/ThemeToggleBtn";

const menuLinks = [
  { name: "Exclusive Articles", link: "/articles" },
  { name: "Add Article", link: "/add-blog" },
  { name: "Manage Blogs", link: "/manage-blogs" },
];

const adminMenuLinks = [
  { name: "Add Event", link: "/add-event" },
  { name: "Add Event Summary", link: "/add-event-summary" },
  { name: "Add Photo", link: "/add-gallery" },
  { name: "Registrations", link: "/registrations" },
  { name: "Transactions", link: "/transactions" },
];

function SecretMenu({ username, admin }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="relative z-100 hidden lg:block">
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          {showMenu ? <AiOutlineClose size={25} /> : <BiMenu size={25} />}
        </Button>

        {showMenu && (
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            className="absolute -top-2 right-16"
          >
            <div className="flex gap-4 items-center bg-background border p-2 rounded-xl z-100 w-full">
              <SignedIn>
                {menuLinks.map((link, index) => {
                  return (
                    <Button variant="secondary" key={index}>
                      <Link href={link.link}>{link.name}</Link>
                    </Button>
                  );
                })}

                {admin &&
                  adminMenuLinks.map((link, index) => {
                    return (
                      <Button variant="secondary" key={index}>
                        <Link href={link.link}>{link.name}</Link>
                      </Button>
                    );
                  })}

                {/* <ModeToggle /> */}
                {/* <UserButton afterSignOutUrl="/" /> */}
              </SignedIn>

              <SignedOut>
                {/* <Button variant="secondary">
                  <Link href="/">Home</Link>
                </Button> */}

                <Button variant="secondary">
                  <Link href="/my-portfolio">Login</Link>
                </Button>

                <Button variant="secondary">
                  {/* Hosted signup redirect */}
                  <Link href="https://bright-foxhound-54.accounts.dev/sign-up?after_sign_up_url=https%3A%2F%2Fcraftfolio.vercel.app%2F&after_sign_in_url=https%3A%2F%2Fcraftfolio.vercel.app%2Fmy-portfolio">
                    Sign Up
                  </Link>
                </Button>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative lg:hidden flex flex-col justify-end items-end">
        <div>
          <Button
            variant="secondary"
            className="rounded-full mb-2"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {showMenu ? <AiOutlineClose size={25} /> : <BiMenu size={25} />}
          </Button>
        </div>

        {showMenu && (
          <motion.div
            className="flex flex-col gap-2 items-end bg-background border p-2 rounded-lg justify-center"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
          >
            {/* <Button variant="secondary" className="w-full">
              <Link href={`/${username}`}>/{username}</Link>
            </Button> */}
            {menuLinks.map((link, index) => {
              return (
                <Button variant="secondary" key={index} className="w-full">
                  <Link href={link.link}>{link.name}</Link>
                </Button>
              );
            })}

            {admin &&
              adminMenuLinks.map((link, index) => {
                return (
                  <Button variant="secondary" className="w-full" key={index}>
                    <Link href={link.link}>{link.name}</Link>
                  </Button>
                );
              })}

            <div className="flex gap-4 flex-wrap w-full items-center justify-between">
              {/* <ModeToggle /> */}
              {/* <UserButton afterSignOutUrl="/" /> */}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SecretMenu;
