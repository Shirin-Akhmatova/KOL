import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import starIcon from "@/assets/icons/star.svg";
import like from "@/assets/icons/like.png";
import notLike from "@/assets/icons/without like.png";
import style from "./Card.module.scss";
import type { Block } from "@/widgets/mockData";

interface PropsType {
  block: Block | null;
  addLike: (block: any) => void;
  likes: Block[];
  mapModalBlock: boolean;
}

const Card = ({ block, addLike, likes, mapModalBlock }: PropsType) => {
  if (!block) return null;
  return (
    <div className={style.Card}>
      <div className={style.images}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          spaceBetween={0}
          slidesPerView={1}
          className={style.swiper}
        >
          {block.images.map((image, imgIndex) => (
            <SwiperSlide className={style.slide} key={imgIndex}>
              <Link to={`/cardPage/${block.id}`}>
                <img src={image} alt="image" />
              </Link>
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
      <Link to={`/cardPage/${block.id}`}>
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
      </Link>
    </div>
  );
};

export default Card;
