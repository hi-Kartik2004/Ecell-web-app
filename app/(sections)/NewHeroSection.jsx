import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import data from "../data";
import Link from "next/link";

function NewHeroSection() {
  return (
    <section className="pt-24 py-6 dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] w-full">
      <div className="container flex flex-col items-center w-full">
        <div className="">
          <AlertComponent
            badgeMessage={data?.heroBadgeMessage}
            alertMessage={data?.heroAlertMessage}
          />
        </div>

        <h1 className="text-3xl lg:leading-tight	 md:text-4xl lg:text-5xl max-w-[1000px] font-bold text-center mt-6">
          {data?.heroTitleLeft + " "}
          <span className="text-primary">
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
      </div>
      <Marquee className="">
        <div className="flex">
          {data.heroMarqueeImages.map((image) => (
            <img
              src={image}
              alt={`hero-image ${image}}`}
              className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-4"
            />
          ))}
        </div>

        <div className="flex">
          {data.heroMarqueeImages.map((image) => (
            <img
              src={image}
              alt={`hero-image ${image}}`}
              className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-4"
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
}

export default NewHeroSection;
