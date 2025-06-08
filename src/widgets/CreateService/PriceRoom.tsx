import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import scss from "./PriceRoom.module.scss";
import type { FormData } from "@/pages/CreateService/CreateService";

const rooms = ["Спальни", "Кровати", "Ванные"];
const PriceRoom = () => {
  const { register, watch } = useFormContext<FormData>();

  useEffect(() => {}, [watch]);

  return (
    <div className={scss.PriceRoom}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.price_block}>
            <h2>Цена</h2>
            <p>
              Настройки применяються ко всем ночам, если не выбраны конкретные
              даты
            </p>
            <h3>Цена за ночь</h3>
            <label htmlFor="price">
              <div className={`${scss.inputPrice} ${scss.cart}`}>
                <span>$</span>
                <input
                  id="price"
                  placeholder="1000"
                  type="number"
                  {...register("price", { required: true })}
                />
              </div>
            </label>
            <div className={`${scss.specialPrice} ${scss.cart}`}>
              <span>Специальная цена на выходные</span>
              <FaPlus />
            </div>
            <h3>Скидки</h3>
            <label htmlFor="discountWeek" className={scss.discountWeek}>
              <div className={scss.cart}>
                <h4>
                  За неделю<span> От 7 ночей</span>
                </h4>
                <div className={scss.inputGroup}>
                  <div className={scss.inputWrapper}>
                    <span>%</span>
                    <input
                      type="number"
                      id="discountWeek"
                      placeholder="0"
                      {...register("discountWeek", { required: true })}
                    />
                  </div>
                  <p>Средняя скидка за неделю: $70 00</p>
                </div>
              </div>
            </label>
            <label htmlFor="discountMonth" className={scss.discountMonth}>
              <div className={scss.cart}>
                <h4>
                  За месяц<span> От 7 ночей</span>
                </h4>
                <div className={scss.inputGroup}>
                  <div className={scss.inputWrapper}>
                    <span>%</span>
                    <input
                      type="number"
                      id="discountMonth"
                      placeholder="0"
                      {...register("discountMonth", { required: true })}
                    />
                  </div>
                  <p>Средняя скидка за месяц: $70 00</p>
                </div>
              </div>
            </label>
          </div>
          <div className={scss.room_block}>
            <div>
              <h2>Комната и кровати </h2>
              <p>Выберите комнату, кровати.</p>
              <div className={scss.rooms}>
                {rooms.map((room, index) => (
                  <div key={index} className={scss.room}>
                    <h4>{room}</h4>
                    <div className={scss.plus_minus}>
                      <button className={scss.minus}>-</button>
                      <span>Неважно</span>
                      <button className={scss.minus}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>Число гостей</h2>
              <p>Сколько гостей с комфортом разместиться в жилье?</p>
              <div className={scss.counter}>
                <button className={scss.minus}>-</button>
                <span>1</span>
                <button className={scss.minus}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRoom;
