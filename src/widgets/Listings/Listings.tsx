import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { blocks } from "../mockData";
import starIcon from "../../assets/icons/star.svg";
import like from "../../assets/icons/like.png";
import notLike from "../../assets/icons/without like.png";
import "swiper/swiper-bundle.css";
import scss from "./Listings.module.scss";
import { Link } from "react-router-dom";

const Listings = () => {
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
    <div className={scss.Listings}>
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
                <Link to="/cardPage">
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
                </Link>
              </div>
            ))}
          </div>
          <div className={scss.map}>
            <iframe
              width="100%"
              height="400"
              src="https://www.openstreetmap.org/export/embed.html?bbox=37.61,55.74,37.65,55.77&layer=mapnik&marker=55.76,37.63"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
