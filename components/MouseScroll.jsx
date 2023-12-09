"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsMouseFill } from "react-icons/bs";
import Link from "next/link";

function MouseScroll({ scrollToId }) {
  return (
    <div className="absolute right-2 bottom-[13%] translate-y-[13%] flex flex-col items-center gap-2 ">
      <Link
        href={`#${scrollToId}`}
        className="flex justify-center flex-col gap-0 items-center"
      >
        <p className="texto  mb-4 p-0 m-0">scroll down</p>
        <div className="w-[2px] h-7 rounded bg-muted-foreground"></div>
        <motion.div
          animate={{ y: -10 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: "reverse",
          }}
        >
          <BsMouseFill className="text-3xl text-muted-foreground" />
        </motion.div>
      </Link>
    </div>
  );
}

export default MouseScroll;
