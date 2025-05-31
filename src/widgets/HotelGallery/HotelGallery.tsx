import React, { useState, useEffect, useRef } from 'react';
import hotel1 from '../../assets/images/hotel1.png';
import hotel2 from '../../assets/images/hotel2.png';
import hotel3 from '../../assets/images/hotel3.png';
import hotel4 from '../../assets/images/hotel4.png';
import hotel5 from '../../assets/images/hotel5.png';

import goldIcon from '../../assets/icons/gold.svg';
import gold2Icon from '../../assets/icons/gold2.svg';
import starIcon from '../../assets/icons/star.svg';
import profile from '../../assets/images/profile.png';

import firstIcon from '../../assets/icons/firstIcon.svg';
import secondIcon from '../../assets/icons/secondIcon.svg';
import thirdIcon from '../../assets/icons/thirdIcon.svg';
import fourthIcon from '../../assets/icons/fourthIcon.svg';
import fifthIcon from '../../assets/icons/fifthIcon.svg';
import sixthIcon from '../../assets/icons/sixthIcon.svg';
import seventhIcon from '../../assets/icons/seventhIcon.svg';
import eighthIcon from '../../assets/icons/eighthIcon.svg';
import ninthIcon from '../../assets/icons/ninthIcon.svg';
import tenthIcon from '../../assets/icons/tenthIcon.svg';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import './hotelGallerry.scss';
import './carousel.scss';

import AnimationBlock from '../animationBlock/AnimationBlock';
import ReserveBlock from '../ReserveBlock/ReserveBlock';

const images = [hotel1, hotel2, hotel3, hotel4, hotel5];

const HotelGallery = () => {
  const [currentImage, setCurrentImage] = useState(hotel1);
  const [showCarousel, setShowCarousel] = useState(false);
  const [reserveVisible, setReserveVisible] = useState(false);
  const [reserveFixed, setReserveFixed] = useState(false);

  const reserveRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);

  // Для плавного подъема при открытии
  useEffect(() => {
    // Показываем ReserveBlock с анимацией через CSS (opacity + transform)
    setReserveVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!reserveRef.current || !bottomRef.current || !midRef.current) return;

      const reserveHeight = reserveRef.current.offsetHeight;
      const bottomRect = bottomRef.current.getBoundingClientRect();
      const midRect = midRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Логика:
      // Если мы "прокрутили" до блока mid (его верх виден), фиксируем ReserveBlock
      // Если ниже mid, то снимаем фиксированное позиционирование (оставляем внутри flow)
      if (midRect.top <= windowHeight - reserveHeight - 20) {
        setReserveFixed(true);
      } else {
        setReserveFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // вызовем сразу, чтобы учесть позицию при загрузке
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Управление каруселью
  const setImage = (image: string) => setCurrentImage(image);
  const toggleCarousel = () => setShowCarousel(!showCarousel);
  const closeCarousel = () => {
    setShowCarousel(false);
    setCurrentImage(hotel1);
  };
  const goToNext = () => {
    const index = images.indexOf(currentImage);
    setCurrentImage(images[(index + 1) % images.length]);
  };
  const goToPrevious = () => {
    const index = images.indexOf(currentImage);
    setCurrentImage(images[(index - 1 + images.length) % images.length]);
  };

  return (
    <div className="gallery-wrapper">
      <h1 className="title">Роскошный и захватывающий дух KARVEN</h1>

      {showCarousel ? (
        <div className="carousel-overlay">
          <div className="carousel-container">
            <button className="arrow left" onClick={goToPrevious}><AiOutlineLeft /></button>
            <img src={currentImage} alt="Big view" className="carousel-image" />
            <button className="arrow right" onClick={goToNext}><AiOutlineRight /></button>
            <div className="carousel-thumbnails">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`thumbnail ${currentImage === src ? 'active' : ''}`}
                  onClick={() => setImage(src)}
                />
              ))}
            </div>
            <button className="close-carousel" onClick={closeCarousel}>Закрыть</button>
          </div>
        </div>
      ) : (
        <div className="grid">
          {images.map((src, idx) => (
            <div key={idx} className={`grid-item ${idx === 0 ? 'large' : ''}`}>
              <img src={src} alt={`Hotel ${idx + 1}`} />
              {idx === 4 && (
                <button className="show-more" onClick={toggleCarousel}>Показать все фото</button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ReserveBlock */}
      <div
        ref={reserveRef}
        className={`reserve-container ${reserveVisible ? 'visible' : ''} ${reserveFixed ? 'fixed' : ''}`}
      >
        <ReserveBlock />
      </div>

      {/* Блоки mid и bottom */}
      <div className="bottom" ref={bottomRef}>
        <h1>Жилье целиком</h1>
        <p>2 гостя · 1 спальня · 1 кровать · 1 ванная</p>
        <h5>
          Карван в Ыссык-Куле — это уютное место на берегу озера, предлагающее комфортные номера и традиционную киргизскую кухню...
        </h5>
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
              <p>4.98</p>
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
            [firstIcon, 'Набережная'],
            [sixthIcon, 'Кухня'],
            [secondIcon, 'Wi-Fi'],
            [seventhIcon, 'Бесплатная парковка'],
            [thirdIcon, 'Бассейн'],
            [eighthIcon, 'Общая сауна'],
            [fourthIcon, 'Телевизор'],
            [ninthIcon, 'Лифт'],
            [fifthIcon, 'Зарядка для авто'],
            [tenthIcon, 'Кондиционер'],
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