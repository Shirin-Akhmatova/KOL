"use client";
import "swiper/swiper-bundle.css";
import scss from "./Carts.module.scss";
import Card from "@/shared/ui/Card/Card";
import { blocks } from "@/widgets/mockData";

const Carts = () => {

  return (
    <div className={scss.Carts}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blocks}>
            {blocks.map((block) => (
              <Card
                block={block}
                mapModalBlock={false}
                key={block.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
