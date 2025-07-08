import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import starIcon from "@/assets/icons/star.svg";
import like from "@/assets/icons/like.png";
import notLike from "@/assets/icons/without like.png";
import style from "./Card.module.scss";
import type { Block } from "@/widgets/mockData";
import { useEffect, useState } from "react";

interface PropsType {
  block: Block | null;
  mapModalBlock: boolean;
  height?: string;
}

const Card = ({ block, mapModalBlock, height }: PropsType) => {
  if (!block) return null;

  const [likes, setLikes] = useState<Block[]>([]);

  const likesFromLocalStore = () => {
    try {
      const item = localStorage.getItem("favorites");
      return item ? setLikes(JSON.parse(item)) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    likesFromLocalStore();
  }, [addLike]);

  function addLike(block: Block) {
    const item = localStorage.getItem("favorites");
    if (!item || !likes.find((el) => el.id === block.id)) {
      localStorage.setItem("favorites", JSON.stringify([...likes, block]));
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify(likes.filter((el) => el.id !== block.id))
      );
    }
  }
  return (
    <div className={style.Card}>
      <a href={`/cardPage/${block.id}`}>
        <div style={{ height: height }} className={style.images}>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={0}
            slidesPerView={1}
            className={style.swiper}
          >
            {block.images.map((image, imgIndex) => (
              <SwiperSlide className={style.slide} key={imgIndex}>
                <img src={image} alt="image" />
              </SwiperSlide>
            ))}
          </Swiper>
          {likes.find((el) => el.id === block.id) ? (
            <img
              className={style.like}
              src={like}
              alt="like"
              onClick={() => addLike(block)}
            />
          ) : (
            <img
              className={style.like}
              src={notLike}
              alt="notLike"
              onClick={() => addLike(block)}
            />
          )}
        </div>
        <div className={style.content}>
          <div className={style.info}>
            <h4>{block.title}</h4>
            <span>
              <img src={starIcon} alt="" />
              {block.rating}
            </span>
          </div>
          <p>{block.place}</p>
          <p>{!mapModalBlock && block.data}</p>
          <h4 className={style.price}>
            {block.price.toLocaleString("ru-RU")} сом{" "}
            <span>за {block.day} ночей</span>
            {mapModalBlock && <span>{block.data}</span>}
          </h4>
        </div>
      </a>
    </div>
  );
};

export default Card;
