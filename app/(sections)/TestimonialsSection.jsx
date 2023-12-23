import { SwiperTestimonals } from "@/components/SwiperTestimonials";
import React from "react";

function TestimonialsSection() {
  return (
    <section className="bg-background flex flex-col items-center justify-center overflow-hidden">
      <div className="container py-10">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="lg:text-4xl max-w-[800px] text-2xl font-bold text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod saepe
            dignissimos.
          </h1>

          <p className="text-center text-sm text-muted-foreground lg:mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui fugit
            autem suscipit?
          </p>
        </div>
      </div>
      <div className="my-6 flex flex-col gap-4">
        <SwiperTestimonals />
        <SwiperTestimonals direction={"left"} />
      </div>
    </section>
  );
}

export default TestimonialsSection;
