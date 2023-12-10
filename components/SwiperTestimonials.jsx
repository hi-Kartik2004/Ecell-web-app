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

export const SwiperTestimonals = () => {
  const s = useSwiper();
  return (
    <section className="container rounded-lg py-6">
      <Swiper
        spaceBetween={10}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      >
        {/* <button onClick={() => s.slideNext()}>Slide to the next slide</button> */}
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Swiper;
