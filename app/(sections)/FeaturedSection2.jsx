import Image from "next/image";
import React from "react";

function FeaturedSection2() {
  return (
    <section className="bg-primary text-gray-800">
      <div className="container py-10">
        <h1 className="text-center text-lg font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          nostrum.
        </h1>

        <div className="flex flex-wrap justify-around gap-4 mt-10 items-center">
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
          <Image src="/ecell-no-bg.png" alt="logo" width={100} height={100} />
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection2;
