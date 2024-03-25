"use client";
import { motion } from "framer-motion";
import React from "react";

function GlassCard({ data, className, img }) {
  return (
    <motion.div
      className="blob-container relative z-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      <motion.svg
        className={`${className} blob w-20 h-20 rounded-full bg-primary absolute transform z-1`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
      >
        <path
          fill="yellow"
          d="M37.5,-57.5C48.4,-45.6,55.2,-30.7,61.4,-15.6C67.6,-0.5,73.1,14.8,68.3,25.2C63.5,35.6,48.4,41,34.1,45.5C19.8,50,6.2,53.7,-9.3,56.4C-24.8,59.1,-49.6,60.8,-66.7,52C-83.7,43.3,-93.1,24,-96.7,6.5C-100.3,-11.1,-98.1,-26.6,-87.2,-40.6C-76.3,-54.6,-56.7,-67.1,-39.3,-72.9C-21.8,-78.6,-6.5,-77.6,8.9,-73.3C24.3,-68.9,48.5,-61.3,63.6,-50.3C78.8,-39.4,84.8,-25.2,89.2,-9.3C93.5,6.6,96.2,22.5,92.2,34.6C88.2,46.7,77.5,55,65.5,64.1C53.5,73.2,40.2,83,26.1,82.6C12,82.2,-2.8,71.7,-16.3,62.5C-29.7,53.3,-41.8,45.4,-53.1,35.4C-64.3,25.3,-74.6,13.2,-80.7,-0.2C-86.8,-13.7,-88.7,-27.5,-80.1,-39.4C-71.6,-51.3,-52.6,-61.4,-36.6,-69.5C-20.7,-77.6,-7.9,-83.7,4.9,-82.9C17.6,-82.1,35.2,-74.4,37.5,-57.5Z"
          transform="translate(100 100)"
        />
      </motion.svg>

      <div className="backdrop-filter backdrop-blur-lg bg-card/50 bg-opacity-30 rounded-lg p-6 mt-10 shadow-inner border-2 dark:text-white  relative z-2 max-w-[400px] w-full">
        <h2 className="text-xl font-semibold">
          {data ? data.title : "Lorem ipsum dolor sit amet."}
        </h2>

        <p className="mt-4 text-muted-foreground">
          {data
            ? data.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."}
        </p>

        {img ? (
          <div className="w-full h-[200px] mt-6 rounded-md">
            <img
              src={`${img}`}
              alt="logo"
              className="h-full w-full object-cover rounded-md"
            />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
}

export default GlassCard;
