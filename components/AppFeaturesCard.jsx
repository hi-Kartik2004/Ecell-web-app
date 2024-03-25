"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function AppFeaturesCard({ reverse, data }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 10 },
      }}
    >
      <div
        className={`flex flex-col items-center mt-6 lg:flex-row lg:gap-16 lg:items-start ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="lg:mt-4 max-w-[500px]">
          <h3 className="lg:text-2xl text-lg font-semibold">
            {data?.title || "Lorem ipsum dolor sit amet."}
          </h3>
          <p className="lg:mt-4 my-2 lg:text-base text-sm">
            {data?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
          </p>

          <Link
            href={`${data?.link || "#"}`}
            className="text-sm lg:text-base underline underline-offset-4"
          >
            Read more
          </Link>
        </div>
        <div className="w-full md:w-[700px] max-w-[500px] flex justify-center mt-4">
          <div className="max-w-[400px] max-h-[400px]">
            <img
              src={`${data?.image || "/ecell-no-bg.png"}`}
              alt="logo"
              className="rounded-lg shadow-lg mt-4 object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AppFeaturesCard;
