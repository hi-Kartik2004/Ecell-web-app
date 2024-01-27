"use client";
import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import data from "../data";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

function NewHeroSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="pt-24 py-6 dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] w-full overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
        className="container flex flex-col items-center w-full"
      >
        <div className="">
          <AlertComponent
            badgeMessage={data?.heroBadgeMessage}
            alertMessage={data?.heroAlertMessage}
          />
        </div>

        <h1 className="text-3xl lg:leading-tight	 md:text-4xl lg:text-5xl max-w-[1000px] font-bold text-center mt-6">
          {data?.heroTitleLeft + " "}
          <span className="bg-gradient-to-b from-primary to-[#ff9300] bg-clip-text text-transparent">
            {data?.heroTitleYellow + " "}
          </span>{" "}
          {data?.heroTitleRight}
        </h1>

        <p className="max-w-[800px] lg:text-base text-muted-foreground text-sm text-center my-6 lg:my-8">
          {data?.heroDescription}
        </p>

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button className="flex gap-2 items-center font-semibold" size="lg">
            <Link
              href={`${data.heroYellowBtnLink}`}
              className="flex gap-2 items-center"
            >
              <Image src="/ecell-no-bg.png" alt="logo" width={25} height={25} />{" "}
              {data?.heroYellowBtnMessage} &rarr;
            </Link>
          </Button>

          <Button
            className="flex gap-2 items-center border-primary/20 border"
            variant="secondary"
            size="lg"
          >
            <Link href={`${data.heroSecondaryBtnLink}`}>
              {data.heroSecondaryBtnMessage} &rarr;
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
      >
        <Marquee className="">
          <div className="flex justify-between">
            {data.heroMarqueeImages.map((image) => (
              <img
                src={image}
                alt={`hero-image ${image}}`}
                className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-6"
              />
            ))}
          </div>

          <div className="flex justify-between">
            {data.heroMarqueeImages.map((image) => (
              <img
                src={image}
                alt={`hero-image ${image}}`}
                className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-6"
              />
            ))}
          </div>
        </Marquee>
      </motion.div>
    </section>
  );
}

export default NewHeroSection;
