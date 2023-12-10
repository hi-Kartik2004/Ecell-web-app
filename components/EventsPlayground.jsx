"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";

function EventsPlayground() {
  const constraintsRef = useRef(null);

  return (
    <motion.div ref={constraintsRef} className="h-screen w-full">
      <motion.div
        drag
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 100 }}
        dragConstraints={constraintsRef}
        className="bg-green-500 w-10 h-10"
      >
        hello
      </motion.div>
    </motion.div>
  );
}

export default EventsPlayground;
