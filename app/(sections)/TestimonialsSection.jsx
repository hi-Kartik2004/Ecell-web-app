import { SwiperTestimonals } from "@/components/SwiperTestimonials";
import React from "react";
import data from "../data";

function splitArrayIntoHalves(array) {
  const middleIndex = Math.ceil(array.length / 2);
  const firstHalf = array.slice(0, middleIndex);
  const secondHalf = array.slice(middleIndex);
  return { firstHalf, secondHalf };
}

function TestimonialsSection() {
  const { firstHalf, secondHalf } = splitArrayIntoHalves(data.testimonials);

  return (
    <section className="bg-background flex flex-col items-center justify-center overflow-hidden">
      <div className="container py-10">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="lg:text-4xl max-w-[800px] text-2xl font-bold text-center">
            {data?.testimonialsTitle || "Lorem ipsum dolor sit amet."}
          </h1>

          <p className="text-center text-sm text-muted-foreground lg:mt-2">
            {data?.testimonialsDescription ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
          </p>
        </div>
      </div>
      <div className="my-6 flex flex-col gap-4">
        <SwiperTestimonals testimonials={firstHalf} />
        <SwiperTestimonals direction={"left"} testimonials={secondHalf} />
      </div>
    </section>
  );
}

export default TestimonialsSection;
