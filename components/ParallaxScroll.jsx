"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/utils/cn";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Input } from "./ui/input";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { AlertDialog } from "./ui/alert-dialog";
import {
  AlertDialogContent,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";

export const ParallaxScroll = ({ className }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const third = Math.ceil(filteredImages.length / 3);
  const firstPart = filteredImages.slice(0, third);
  const secondPart = filteredImages.slice(third, 2 * third);
  const thirdPart = filteredImages.slice(2 * third);

  return (
    <div className="flex flex-col items-center">
      <Input
        type="text"
        className="max-w-[400px] mb-10"
        placeholder={"Search by image title"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div
        className={cn("h-[92vh] items-start overflow-y-auto w-full", className)}
        ref={gridRef}
        style={{ scrollbarWidth: "none", overflowY: "scroll" }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-10xl mx-auto gap-10 py-10 px-10"
          ref={gridRef}
        >
          <div className="grid gap-10">
            {firstPart.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst }}
                key={"grid-1" + idx}
                className="relative"
              >
                <Image
                  src={el.image}
                  className="h-80 w-full object-cover object-center rounded-lg gap-10 !m-0 border shadow-sm shadow-primary/50 p-2"
                  width={"400"}
                  height={"400"}
                  alt={el.name}
                />

                <p className="mt-4">{el?.name}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-10">
            {secondPart.map((el, idx) => (
              <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                <Image
                  src={el.image}
                  className="h-80 w-full object-cover object-center rounded-lg gap-10 !m-0 border shadow-sm shadow-primary/50 p-2"
                  height="400"
                  width="400"
                  alt={el.name}
                />
                <p className="mt-4">{el?.name}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-10">
            {thirdPart.map((el, idx) => (
              <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                <Image
                  src={el.image}
                  className="h-80 w-full object-cover object-center rounded-lg gap-10 !m-0 border shadow-sm shadow-primary/50 p-2"
                  height="400"
                  width="400"
                  alt={el.name}
                />
                <p className="mt-4">{el?.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
