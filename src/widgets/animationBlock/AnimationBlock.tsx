import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./animationBlock.scss";
import { blocks } from "../mockData";

const AnimationBlock: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPaused = useRef(false);

  const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const velocityRef = useRef(0);
  const isInertiaActive = useRef(false);

  const baseSpeed = 1;
  const currentSpeedRef = useRef<number>(baseSpeed);
  const targetSpeedRef = useRef<number>(baseSpeed);
  const maxDelta = 60;
  const friction = 0.95;
  const lastMoveTimeRef = useRef(performance.now());

  const { id } = useParams();

  const stopAutoScroll = () => {
    targetSpeedRef.current = 0;
    isPaused.current = true;
  };

  const resumeAutoScroll = () => {
    targetSpeedRef.current = baseSpeed;
    isPaused.current = false;
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const listWidth = list.scrollWidth / 2;

    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        if (!isDragging.current && !isPaused.current) {
          if (isInertiaActive.current) {
            positionRef.current -= velocityRef.current;
            velocityRef.current *= friction;
            if (Math.abs(velocityRef.current) < 0.1) {
              isInertiaActive.current = false;
              resumeAutoScroll();
            }
          } else {
            if (hoverDirection === "left") {
              targetSpeedRef.current = -baseSpeed;
            } else if (hoverDirection === "right") {
              targetSpeedRef.current = baseSpeed;
            } else {
              targetSpeedRef.current = baseSpeed;
            }

            currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.1;
            positionRef.current += currentSpeedRef.current;
          }

          if (positionRef.current > listWidth) positionRef.current -= listWidth;
          if (positionRef.current < 0) positionRef.current += listWidth;

          list.style.transform = `translateX(${-positionRef.current}px)`;
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => requestRef.current && cancelAnimationFrame(requestRef.current);
  }, [hoverDirection]);

  const handleMove = (clientX: number) => {
    if (!isDragging.current || !listRef.current) return;
    lastMoveTimeRef.current = performance.now();

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isDragging.current) {
        const now = performance.now();
        if (now - lastMoveTimeRef.current > 500) endDrag();
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

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

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const endDrag = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsDraggingState(false);
      isInertiaActive.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", endDrag);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", endDrag);
    };
  }, []);

  const onMouseEnterLeft = () => setHoverDirection("left");
  const onMouseEnterRight = () => setHoverDirection("right");
  const onMouseLeave = () => setHoverDirection(null);

  const doubledBlocks = [...blocks, ...blocks];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // прокрутка вверх при нажатии карточки из карусели
  }, [id]);

  return (
    <div className="animation-block">
      <h2 className="section-title">Вас может заинтересовать</h2>
      <div
        className={`card-list-wrapper ${isDraggingState ? "dragging" : ""}`}
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="card-list" ref={listRef}>
          {doubledBlocks.map((card, index) => (
            <Link to={`/cardPage/${index}`}>
              <div
                className="card"
                key={index}
                onMouseEnter={stopAutoScroll}
                onMouseLeave={resumeAutoScroll}
              >
                <div
                  className="image-placeholder"
                  style={{
                    backgroundImage: `url(${card.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  />
                <div className="card-info">
                  <div className="title">{card.title}</div>
                  <div className="subtitle">
                    <span className="price">{card.price.toLocaleString("ru-RU")} сом</span>
                    <span className="dot" />
                    <span className="date">{card.data}</span>
                  </div>
                </div>
              </div>
            </Link>
            
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
