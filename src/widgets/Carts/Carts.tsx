"use client";
import { useEffect, useMemo, useState } from "react";
import "swiper/swiper-bundle.css";
import scss from "./Carts.module.scss";
import { type Block } from "../mockData";
import Card from "@/shared/ui/card/Card";
import { blocks } from "@/widgets/mockData";

const Carts = () => {
  const likesFromLocalStore: Block[] = useMemo(() => {
    try {
      const item = localStorage.getItem("favorites");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  }, []);
  const [likes, setLikes] = useState<Block[]>(likesFromLocalStore);

  function addLike(block: Block) {
    setLikes((prevLikes) =>
      prevLikes.find((el) => el.id === block.id)
        ? prevLikes.filter((item) => item.id !== block.id)
        : [...prevLikes, block]
    );
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(likes));
  }, [likes]);

  return (
    <div className={scss.Carts}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blocks}>
            {blocks.map((block) => (
              <Card block={block} addLike={addLike} likes={likes} mapModalBlock={false} key={block.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
