import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { blocks } from "../mockData";
import starIcon from "../../assets/icons/star.svg";
import like from "../../assets/icons/like.png";
import notLike from "../../assets/icons/without like.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import scss from "./Listings.module.scss";

const Listings = () => {
  const [likes, setLikes] = useState<number[]>([]); // ✅ Храним лайки в состоянии
  const mapRef = useRef<any>(null);

  function addLike(id: number) {
    setLikes(
      (prevLikes) =>
        prevLikes.includes(id)
          ? prevLikes.filter((item) => item !== id) // Удаляем лайк
          : [...prevLikes, id] // Добавляем лайк
    );
  }

  const handleBoundsChange = () => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds(); // [[southWestLat, southWestLng], [northEastLat, northEastLng]]
      // const center = mapRef.current.getCenter(); // [lat, lng]
      // const zoom = mapRef.current.getZoom();

      console.log("Bounds:", bounds);
    }
  };

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
                        <img src={image} alt="image" />
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
          <div className={scss.map}>
            <YMaps query={{ apikey: "655b74b4-94c5-4212-b86d-bd8f6fdae225" }}>
              <Map
                defaultState={{ center: [41.97, 77.29], zoom: 7 }}
                width="100%"
                height="500px"
                position="sticky"
                onBoundsChange={handleBoundsChange}
                instanceRef={(ref) => (mapRef.current = ref)}
              >
                {blocks.map((store, idx) => (
                  <Placemark
                    key={idx}
                    geometry={store.coordinates}
                    properties={{
                      iconContent: `${store.price.toLocaleString("ru-RU")} сом`,
                    }}
                    options={{
                      preset: "islands#violetStretchyIcon",
                      iconColor: "#ff5a5f",
                    }}
                  />
                ))}
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
