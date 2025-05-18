import React, { useEffect, useRef, useState } from 'react';
import './animationBlock.scss';

const cards = Array(5).fill({
  title: 'Groveland, California',
  price: '$289 night',
  date: 'Apr 17–22',
});

const AnimationBlock: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const positionRef = useRef(0); // сохраняем позицию между кадрами
  const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);

  const baseSpeed = 0.5; // базовая скорость
  const currentSpeedRef = useRef<number>(baseSpeed); // текущая скорость
  const targetSpeedRef = useRef<number>(baseSpeed); // целевая скорость

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const listWidth = list.scrollWidth / 2;

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Устанавливаем целевую скорость в зависимости от направления
        if (hoverDirection === 'left') {
          targetSpeedRef.current = -baseSpeed;
        } else if (hoverDirection === 'right') {
          targetSpeedRef.current = baseSpeed;
        }

        // Плавное приближение currentSpeed к targetSpeed (сглаживание)
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.05;

        positionRef.current += currentSpeedRef.current;

        if (positionRef.current > listWidth) positionRef.current -= listWidth;
        if (positionRef.current < 0) positionRef.current += listWidth;

        list.style.transform = `translateX(${-positionRef.current}px)`;
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoverDirection]);

  const onMouseEnterLeft = () => setHoverDirection('left');
  const onMouseEnterRight = () => setHoverDirection('right');
  const onMouseLeave = () => setHoverDirection(null); // движение продолжается по текущей скорости

  const doubledCards = [...cards, ...cards];

  return (
    <div className="animation-block">
      <h2 className="section-title">Вас может заинтересовать</h2>
      <div className="card-list-wrapper" ref={containerRef}>
        <div className="card-list" ref={listRef}>
          {doubledCards.map((card, index) => (
            <div className="card" key={index}>
              <div className="image-placeholder" />
              <div className="card-info">
                <div className="title">{card.title}</div>
                <div className="subtitle">
                  <span className="price">{card.price}</span>
                  <span className="dot" />
                  <span className="date">{card.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="hover-zone left"
          onMouseEnter={onMouseEnterLeft}
          onMouseLeave={onMouseLeave}
        />
        <div
          className="hover-zone right"
          onMouseEnter={onMouseEnterRight}
          onMouseLeave={onMouseLeave}
        />
      </div>
    </div>
  );
};

export default AnimationBlock;
