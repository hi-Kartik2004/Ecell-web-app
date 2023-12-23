import Image from "next/image";
import React from "react";

function FeaturedSection2() {
  return (
    <section className="dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
      <div className="container py-10 flex flex-col items-center justify-center">
        <h1 className="text-center lg:text-xl text-lg font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          nostrum.
        </h1>

        <div className="flex flex-wrap justify-around w-full gap-4 mt-10 items-center max-w-[800px]">
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection2;
