"use client";
import Image from "next/image";
import React from "react";
import data from "../data";
import { motion } from "framer-motion";

function FeaturedSection2() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 10 },
      }}
      className="dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]"
    >
      <div className="container py-10 flex flex-col items-center justify-center">
        <h1 className="text-center lg:text-xl text-lg font-medium">
          {data?.featuredSection2Title}
        </h1>

        <div className="flex flex-wrap justify-around w-full gap-4 mt-10 items-center max-w-[800px]">
          {data.featuredSection2Images.map((image, index) => (
            <img
              src={image}
              alt={image}
              className={`${
                index === 1 ? "max-w-[100px]" : "max-w-[200px] w-full"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FeaturedSection2;
