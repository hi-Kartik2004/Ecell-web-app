import Link from "next/link";
import React from "react";

function AppFeaturesCard({ reverse }) {
  return (
    <div>
      <div
        className={`flex flex-col items-center mt-6 lg:flex-row lg:gap-16 lg:items-start ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="lg:mt-4 max-w-[500px]">
          <h3 className="lg:text-2xl text-lg font-semibold">
            1. Lorem ipsum dolor sit amet consectetur.
          </h3>
          <p className="lg:mt-4 my-2 lg:text-base text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            alias aliquam consequatur. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugiat alias aliquam consequatur. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Fugiat alias aliquam
            consequatur.
          </p>

          <Link href="/" className="text-sm lg:text-base underline underline-offset-4">
            Read more
          </Link>
        </div>
        <div className="w-full md:w-[700px] max-w-[500px] flex justify-center mt-4">
          <div className="max-w-[400px] max-h-[400px]">
            <img
              src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="logo"
              className="rounded-lg shadow-lg mt-4 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppFeaturesCard;
