import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { FaChessKing, FaStar } from "react-icons/fa";
import { FaHeartPulse } from "react-icons/fa6";

function FeaturedSection() {
  return (
    <section className="dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
      <div className="container py-6">
        <h1 className="text-2xl font-semibold flex gap-4 items-center">
          <FaChessKing className="text-primary" /> Lorem, ipsum dolor.
        </h1>

        <Marquee className="my-6" flex gap-6>
          <div className="flex gap-6">
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
          </div>

          <div className="flex gap-6">
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
            <Image src="/ecell-no-bg.png" alt="logo" width={170} height={170} />
          </div>
        </Marquee>

        {/* <p className="text-muted-foreground mt-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo odio
          nihil alias fugiat quidem ipsam ducimus aliquam facere dolorum magni.
        </p> */}
      </div>
    </section>
  );
}

const sectionData = {
  logos: [
    {
      name: "logo1",
      src: "/ecell-no-bg.png",
    },
    {
      name: "logo2",
      src: "/ecell-no-bg.png",
    },
    {
      name: "logo3",
      src: "/ecell-no-bg.png",
    },
    {
      name: "logo4",
      src: "/ecell-no-bg.png",
    },
  ],
};

export default FeaturedSection;
