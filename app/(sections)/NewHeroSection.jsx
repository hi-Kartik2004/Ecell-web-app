import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import React from "react";
import Marquee from "react-fast-marquee";

function NewHeroSection() {
  return (
    <section className="pt-24 py-6 dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] w-full">
      <div className="container flex flex-col items-center w-full">
        <div className="">
          <AlertComponent
            badgeMessage="New"
            alertMessage="  Lorem ipsum dolor sit amet consectetur!"
          />
        </div>

        <h1 className="text-3xl lg:leading-tight	 lg:text-5xl max-w-[1000px] font-bold text-center mt-6">
          Lorem ipsum dolor sit amet{" "}
          <span className="text-primary">consectetur adipisicing</span> elit.
          Impedit, autem?
        </h1>

        <p className="max-w-[800px] lg:text-base text-muted-foreground text-sm text-center my-6 lg:my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          sint ex nesciunt quia sequi iure accusantium recusandae aliquam?
        </p>

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button className="flex gap-2 items-center font-semibold" size="lg">
            <Image src="/ecell-no-bg.png" alt="logo" width={25} height={25} />{" "}
            Join the Community &rarr;
          </Button>

          <Button
            className="flex gap-2 items-center border-primary/20 border"
            variant="secondary"
            size="lg"
          >
            Explore Events &rarr;
          </Button>
        </div>
      </div>
      <Marquee className="">
        <div className="flex">
          <img
            src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hero-image"
            className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-4"
          />
          <img
            src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hero-image"
            className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-4"
          />
        </div>

        <div className="flex">
          <img
            src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hero-image"
            className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-4"
          />
          <img
            src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hero-image"
            className="w-full rounded-xl mt-10 shadow-lg border-yellow-500/50 border-2 max-h-[300px] mr-4"
          />
        </div>
      </Marquee>
    </section>
  );
}

export default NewHeroSection;
