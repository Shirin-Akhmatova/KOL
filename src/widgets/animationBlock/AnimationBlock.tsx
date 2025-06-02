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
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const velocityRef = useRef(0);
  const isInertiaActive = useRef(false);

  const baseSpeed = 1.5;
  const currentSpeedRef = useRef<number>(baseSpeed);
  const targetSpeedRef = useRef<number>(baseSpeed);

  const maxDelta = 60;
  const friction = 0.95; // Сила замедления инерции

  // Новый ref для отслеживания времени последнего движения мыши
  const lastMoveTimeRef = useRef(performance.now());

  const stopAutoScroll = () => {
    targetSpeedRef.current = 0;
  };

  const resumeAutoScroll = () => {
    targetSpeedRef.current = baseSpeed;
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const listWidth = list.scrollWidth / 2;

    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        if (!isDragging.current) {
          if (isInertiaActive.current) {
            // При инерции
            positionRef.current -= velocityRef.current;
            velocityRef.current *= friction;

            if (Math.abs(velocityRef.current) < 0.1) {
              isInertiaActive.current = false;
              resumeAutoScroll();
            }
          } else {
            // При обычном автоскролле или наведении
            if (hoverDirection === 'left') {
              targetSpeedRef.current = -baseSpeed;
            } else if (hoverDirection === 'right') {
              targetSpeedRef.current = baseSpeed;
            } else {
              targetSpeedRef.current = baseSpeed;
            }

            currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.1;
            positionRef.current += currentSpeedRef.current;
          }

          // Цикличный скролл
          if (positionRef.current > listWidth) positionRef.current -= listWidth;
          if (positionRef.current < 0) positionRef.current += listWidth;

          list.style.transform = `translateX(${-positionRef.current}px)`;
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoverDirection]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsDraggingState(true);
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    velocityRef.current = 0;
    lastMoveTimeRef.current = performance.now();
    stopAutoScroll();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsDraggingState(true);
    dragStartX.current = e.touches[0].clientX;
    lastX.current = e.touches[0].clientX;
    velocityRef.current = 0;
    lastMoveTimeRef.current = performance.now();
    stopAutoScroll();
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || !listRef.current) return;

    lastMoveTimeRef.current = performance.now(); // Обновляем время последнего движения

    let deltaX = clientX - lastX.current;
    deltaX = Math.max(-maxDelta, Math.min(maxDelta, deltaX));

    velocityRef.current = deltaX;
    positionRef.current -= velocityRef.current;

    const list = listRef.current;
    const listWidth = list.scrollWidth / 2;

    if (positionRef.current > listWidth) positionRef.current -= listWidth;
    if (positionRef.current < 0) positionRef.current += listWidth;

    list.style.transform = `translateX(${-positionRef.current}px)`;
    lastX.current = clientX;
  };

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const endDrag = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsDraggingState(false);
      isInertiaActive.current = true; // Запускаем инерцию
    }
  };

  // Новый эффект: принудительное завершение драга, если долго не движется мышь
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isDragging.current) {
        const now = performance.now();
        const timeSinceLastMove = now - lastMoveTimeRef.current;

        if (timeSinceLastMove > 500) {
          endDrag();
        }
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', endDrag);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', endDrag);
    };
  }, []);

  const onMouseEnterLeft = () => setHoverDirection('left');
  const onMouseEnterRight = () => setHoverDirection('right');
  const onMouseLeave = () => setHoverDirection(null);

  const doubledCards = [...cards, ...cards];

  return (
    <div className="animation-block">
      <h2 className="section-title">Вас может заинтересовать</h2>
      <div
        className={`card-list-wrapper ${isDraggingState ? 'dragging' : ''}`}
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
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

        <div className="hover-zone left" onMouseEnter={onMouseEnterLeft} onMouseLeave={onMouseLeave} />
        <div className="hover-zone right" onMouseEnter={onMouseEnterRight} onMouseLeave={onMouseLeave} />

        <div className="blur-overlay left-blur" />
        <div className="blur-overlay right-blur" />
      </div>
    </div>
  );
};

export default AnimationBlock;
