"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import style from "./MySwiper.module.css"

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function MySwiper() {
  return (
    <div className={style.container}>
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
            alt="birthday card"
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/quotes.png"}
            alt="a quote card"
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/book_cover.png"}
            alt="book cover card"
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/merry_christmas.png"}
            alt="merry christmas card"
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/sunset.png"}
            alt="a painting of sunset by the seashore"
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/static/images/swiper/wedding.png"}
            alt="a wedding invitation card"
            width={500}
            height={500}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
