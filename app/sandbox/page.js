"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function MySwiper() {
  return (
    <div style={{ width: "500px", height: "500px", alignSelf: "center" }}>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/birthday_card.png"}
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/merry_christmas.png"}
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/book_cover.png"}
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/quotes.png"}
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/sunset.png"}
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/wedding.png"}
            width={500}
            height={500}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
