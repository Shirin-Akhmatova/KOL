import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import scss from "./PriceRoom.module.scss";
import type { FormData } from "@/pages/CreateService/CreateService";

const rooms = [
  { key: "bedroom", label: "Спальни" },
  { key: "bed", label: "Кровати" },
  { key: "bathroom", label: "Ванные" },
] as const;

const PriceRoom = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: {},
  } = useFormContext<FormData>();

  const guests = watch("guests") ?? 1;

  const handleGuestChange = (type: "increment" | "decrement") => {
    const current = getValues("guests");

    if (type === "decrement" && current > 1) {
      setValue("guests", current - 1);
    }
    if (type === "increment") {
      setValue("guests", current + 1);
    }
  };

  const handleRoomChange = (
    key: (typeof rooms)[number]["key"],
    type: "increment" | "decrement"
  ) => {
    const current = getValues(key);
    if (type === "decrement" && current > 0) {
      setValue(key, current - 1);
    }
    if (type === "increment") {
      setValue(key, current + 1);
    }
  };

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
            <label>
              <div className={`${scss.inputPrice} ${scss.cart}`}>
                <span>$</span>
                <input
                  placeholder="1000"
                  type="number"
                  {...register("price", { required: true })}
                  onWheel={(e) => e.currentTarget.blur()}
                />
              </div>
            </label>
            <div className={`${scss.specialPrice} ${scss.cart}`}>
              <span>Специальная цена на выходные</span>
              <FaPlus />
            </div>
            <h3>Скидки</h3>
            <label className={scss.discountWeek}>
              <div className={scss.cart}>
                <h4>
                  За неделю<span> От 7 ночей</span>
                </h4>
                <div className={scss.inputGroup}>
                  <div className={scss.inputWrapper}>
                    <span>%</span>
                    <input
                      type="number"
                      {...register("discountWeek", { required: true })}
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </div>
                  <p>Средняя скидка за неделю: $70 00</p>
                </div>
              </div>
            </label>
            <label className={scss.discountMonth}>
              <div className={scss.cart}>
                <h4>
                  За месяц<span> От 7 ночей</span>
                </h4>
                <div className={scss.inputGroup}>
                  <div className={scss.inputWrapper}>
                    <span>%</span>
                    <input
                      type="number"
                      {...register("discountMonth", { required: true })}
                      onWheel={(e) => e.currentTarget.blur()}
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
                {rooms.map((room) => {
                  const value = watch(room.key);

                  return (
                    <div key={room.key} className={scss.room}>
                      <h4>{room.label}</h4>
                      <div className={scss.plus_minus}>
                        <button
                          className={`${scss.minus} ${
                            value <= 0 && scss.disabled
                          }`}
                          onClick={() =>
                            handleRoomChange(room.key, "decrement")
                          }
                          disabled={value <= 0}
                        >
                          -
                        </button>
                        <span>{value || "Неважно"}</span>
                        <button
                          className={scss.minus}
                          onClick={() =>
                            handleRoomChange(room.key, "increment")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>Число гостей</h2>
              <p>Сколько гостей с комфортом разместиться в жилье?</p>
              <div className={scss.counter}>
                <button
                  className={`${scss.plus} ${guests <= 1 && scss.disabled}`}
                  onClick={() => handleGuestChange("decrement")}
                  disabled={guests <= 1}
                >
                  -
                </button>
                <span>{guests}</span>
                <button
                  className={scss.minus}
                  onClick={() => handleGuestChange("increment")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRoom;
