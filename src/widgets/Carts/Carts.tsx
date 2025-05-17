import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import starIcon from "../../assets/icons/starIcon.png";
import like from "../../assets/icons/like.png";
import notLike from "../../assets/icons/without like.png";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import scss from "./Carts.module.scss";

interface Block {
  images: string[];
  title: string;
  place: string;
  data: string;
  price: number;
  day: number;
  rating: number;
}

const blocks: Block[] = [
  {
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-1208478853883571250/original/03aef6b8-3992-463d-94ca-2422c2d82757.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/cba06c3e-f0e0-4ef0-b991-aa6fd2348c50.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-36774428/original/15110762-267f-4a08-88ae-2d9d3603284d.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-804959254707180514/original/534bd9ae-d1b0-4f85-b7fb-b459fd07d153.jpeg?im_w=720",
    ],
    title: "Moss Beach (Калифорния, США)",
    place: "пляж и бухта",
    data: "7–12 июнь",
    price: 149721,
    day: 5,
    rating: 4.8,
  },
  {
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjYxMTc4MTc=/original/ed42e4b2-2563-4887-bbd9-29dfb096db88.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1265698983331884820/original/bc073cb4-1f5d-4348-a0d9-0eb31c657b96.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/27117c5b-3ba2-4300-aaa7-c5b5f93c589b.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzMxNjcyODcyNTg1MTAzNjU4/original/1c0f99dc-295c-4ead-9fa9-fd7277be7ced.jpeg?im_w=720",
    ],
    title: "Half Moon Bay (Калифорния, США)",
    place: "пляж и океан",
    data: "4–10 мая",
    price: 247139,
    day: 6,
    rating: 4.7,
  },
  {
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-854065432551935839/original/270e6f4f-5fea-4117-a552-523370f62a74.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1243609850535519033/original/41b8ebfd-6da4-499d-be74-775144a277d5.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1310576659813772445/original/45f6369d-6b6b-48bb-8a75-6dd51ebf1b54.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1316413277822512898/original/33f6ac90-1c47-4db5-87b6-acd903358810.jpeg?im_w=720",
    ],
    title: "Jibhi (Индия)",
    place: "горы и долина",
    data: "11-24 мая",
    price: 310595,
    day: 13,
    rating: 4.9,
  },
  {
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-1304959172770902956/original/382d469a-7747-4bfe-a72a-f15cfd4bbbb1.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-668620215138733009/original/cdf158ed-b31c-40cc-8305-d8d1ef1b588e.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-904319036347745143/original/e6bf9e8c-2002-4ae2-909f-8f9f36ea0bda.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-40910232/original/1da673da-6164-40f3-8f1c-a74730bdce25.jpeg?im_w=720",
    ],
    title: "Манали (Индия)",
    place: "горы и сад",
    data: "17-22 июнь",
    price: 190650,
    day: 5,
    rating: 4.5,
  },
  {
    images: [
      "https://a0.muscache.com/im/pictures/f5ceadbd-a34f-47d1-913f-7087a2c34398.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/e169a5d1-0e7c-4aff-a5e8-0538518aa941.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-16105121/original/4c3142cf-093d-46d9-97d7-e63735866364.png?im_w=720",
      "https://a0.muscache.com/im/pictures/45a176c5-3f17-44b0-8854-c2d640e01a64.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/28e31c21-cd06-4208-9398-cf78aea94a2f.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/7c2335c1-c008-4538-a71e-1d8fec905ed7.jpg?im_w=720  ",
    ],
    title: "Mashobra (Индия)",
    place: "вид на горы",
    data: "9–14 июнь",
    price: 130000,
    day: 5,
    rating: 4.8,
  },
  {
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-853189955208971108/original/bdefcb9d-5e3f-495d-bc04-013125cd99c6.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/e43414c9-9cd6-429a-ab17-9e08d6bb189a.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-853189955208971108/original/e17f60e0-62e3-4e82-b4d9-f25968beac53.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-853189955208971108/original/9e6fea38-3842-4057-b78f-25b865479352.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-853189955208971108/original/ace0f6cc-7bce-4b49-ac58-958215b18e47.jpeg?im_w=720",
    ],
    title: "Sainjand (Индия)",
    place: "горы и долина",
    data: "11–16 мая",
    price: 180000,
    day: 5,
    rating: 4.9,
  },
];
const Carts = () => {
  const [likes, setLikes] = useState<number[]>([]); // ✅ Храним лайки в состоянии

  function addLike(id: number) {
    setLikes(
      (prevLikes) =>
        prevLikes.includes(id)
          ? prevLikes.filter((item) => item !== id) // Удаляем лайк
          : [...prevLikes, id] // Добавляем лайк
    );
  }

  return (
    <div className={scss.Carts}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blocks}>
            {blocks.map((block, index) => (
              <div className={scss.block} key={index}>
                <div className={scss.images}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    className={scss.swiper}
                  >
                    {block.images.map((image, imgIndex) => (
                      <SwiperSlide className={scss.slide} key={imgIndex}>
                        <Link to="/cardPage">
                          <img src={image} alt="image" />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {likes.includes(index) ? (
                    <img
                      className={scss.like}
                      src={like}
                      alt="like"
                      onClick={() => addLike(index)}
                    />
                  ) : (
                    <img
                      className={scss.like}
                      src={notLike}
                      alt="notLike"
                      onClick={() => addLike(index)}
                    />
                  )}
                </div>
                <div className={scss.info}>
                  <h4>{block.title}</h4>
                  <span>
                    <img src={starIcon} alt="" />
                    {block.rating}
                  </span>
                </div>
                <p>{block.place}</p>
                <p>{block.data}</p>
                <h4 className={scss.price}>
                  {block.price.toLocaleString("ru-RU")}
                  сом <p>за {block.day} ночей</p>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
