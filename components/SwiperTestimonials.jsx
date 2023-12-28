"use client";
import React from "react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import TestimonialCard from "./TestimonialCard";
import Marquee from "react-fast-marquee";

export const SwiperTestimonals = ({ marginLeft, direction, testimonials }) => {
  const s = useSwiper();
  return (
    <section>
      <Marquee
        pauseOnHover={true}
        direction={direction ? direction : "right"}
        className={`ml-[${marginLeft ? marginLeft : 0}]`}
      >
        <div className="flex mr-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        <div className="mr-4 flex gap-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Swiper;
