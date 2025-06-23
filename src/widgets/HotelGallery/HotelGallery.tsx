import { useState, useRef, useEffect } from "react";
import goldIcon from "../../assets/icons/gold.svg";
import gold2Icon from "../../assets/icons/gold2.svg";
import starIcon from "../../assets/icons/star.svg";
import profile from "../../assets/images/profile.png";

import firstIcon from "../../assets/icons/firstIcon.svg";
import secondIcon from "../../assets/icons/secondIcon.svg";
import thirdIcon from "../../assets/icons/thirdIcon.svg";
import fourthIcon from "../../assets/icons/fourthIcon.svg";
import fifthIcon from "../../assets/icons/fifthIcon.svg";
import sixthIcon from "../../assets/icons/sixthIcon.svg";
import seventhIcon from "../../assets/icons/seventhIcon.svg";
import eighthIcon from "../../assets/icons/eighthIcon.svg";
import ninthIcon from "../../assets/icons/ninthIcon.svg";
import tenthIcon from "../../assets/icons/tenthIcon.svg";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./hotelGallerry.scss";
import "./carousel.scss";

import AnimationBlock from "../animationBlock/AnimationBlock";
import ReserveBlock from "../ReserveBlock/ReserveBlock";
import type { Block } from "../mockData";

const HotelGallery = ({ currentCotadge }: { currentCotadge: Block }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
  // const [currentImage, setCurrentImage] = useState(hotel1);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);

  // Управление каруселью
  // const setImage = (image: string) => setCurrentImage(image);
  const toggleCarousel = () => setShowCarousel(!showCarousel);
  const closeCarousel = () => {
    setShowCarousel(false);
    // setCurrentImage(hotel1);
  };
  // const goToNext = (images: string[]) => {
  //   const index = images.indexOf(currentImage);
  //   setCurrentImage(images[(index + 1) % images.length]);
  // };
  // const goToPrevious = (images: string[]) => {
  //   const index = images.indexOf(currentImage);
  //   setCurrentImage(images[(index - 1 + images.length) % images.length]);
  // };
  const goToPrevious = (idx: number) => {
    if (idx > 0) {
      setCurrentImageIdx(idx - 1);
    }
  };
  const goToNext = (idx: number) => {
    if (idx < currentCotadge.images.length - 1) {
      setCurrentImageIdx(idx + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const top = wrapperRef.current.getBoundingClientRect().top;
      setIsSticky(top <= 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="gallery-wrapper">
      <h1 className="title">{currentCotadge.title}</h1>

      {showCarousel ? (
        <div className="carousel-overlay">
          <div className="carousel-container">
            <button
              className="arrow left"
              onClick={() => goToPrevious(currentImageIdx)}
            >
              <AiOutlineLeft color="#fff" />
            </button>
            <img
              src={currentCotadge.images[currentImageIdx]}
              alt="Big view"
              className="carousel-image"
            />
            <button
              className="arrow right"
              onClick={() => goToNext(currentImageIdx)}
            >
              <AiOutlineRight color="#fff" />
            </button>
            <div className="carousel-thumbnails">
              {currentCotadge.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`thumbnail ${
                    currentImageIdx === idx ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIdx(idx)}
                />
              ))}
            </div>
            <button className="close-carousel" onClick={closeCarousel}>
              Закрыть
            </button>
          </div>
        </div>
      ) : (
        <div className="grid">
          {currentCotadge.images.slice(0, 5).map((src, idx) => (
            <div key={idx} className={`grid-item ${idx === 0 ? "large" : ""}`}>
              <img src={src} alt={`Hotel ${idx + 1}`} />
              {idx === 4 && (
                <button className="show-more" onClick={toggleCarousel}>
                  Показать все фото
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Блоки mid и bottom */}
      <div className="bottom-reserve-wrapper" ref={wrapperRef}>
        <div className="bottom" ref={bottomRef}>
          <h1>{currentCotadge.place}</h1>
          <p>2 гостя · 1 спальня · 1 кровать · 1 ванная</p>
          <h5>{currentCotadge.description}</h5>
        </div>
        <div className={`reserve-box ${isSticky ? "is-sticky" : ""}`}>
          <ReserveBlock />
        </div>
      </div>

      <div className="mid" ref={midRef}>
        <div className="mid-top">
          <div className="goldteam">
            <img src={goldIcon} alt="icon1" />
            <h3>Выбор гостей</h3>
            <img src={gold2Icon} alt="icon2" />
          </div>
          <h2>Это жилье — одно из самых любимых у гостей на KÖL</h2>
          <div className="team">
            <div className="left">
              <p>{currentCotadge.rating}</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={starIcon} alt="star" />
                ))}
              </div>
            </div>
            <div className="right">
              <p>97</p>
              <h6>отзывов</h6>
            </div>
          </div>
        </div>
        <div className="mid-bottom">
          <img src={profile} alt="host" />
          <div className="text">
            <h3>Хозяин: Ширин</h3>
            <p>Суперхозяин · 1 год принимает гостей</p>
          </div>
        </div>
      </div>

      <AnimationBlock />

      <div className="low">
        <h1 className="low-title">Какие удобства вас ждут</h1>
        <div className="low-grid">
          {[
            [firstIcon, "Набережная"],
            [sixthIcon, "Кухня"],
            [secondIcon, "Wi-Fi"],
            [seventhIcon, "Бесплатная парковка"],
            [thirdIcon, "Бассейн"],
            [eighthIcon, "Общая сауна"],
            [fourthIcon, "Телевизор"],
            [ninthIcon, "Лифт"],
            [fifthIcon, "Зарядка для авто"],
            [tenthIcon, "Кондиционер"],
          ].map(([icon, text], idx) => (
            <div className="low-item" key={idx}>
              <img src={icon} alt={text} />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;
