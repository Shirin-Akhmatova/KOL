import type { FormData } from "@/pages/CreateService/CreateService";
import "react-clock/dist/Clock.css";
import scss from "./ChooseDate.module.scss";
import Clock from "react-clock";
import { useFormContext } from "react-hook-form";

const ChooseDate = () => {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  const hour = watch("hourHandle");
  const minute = watch("minuteHandle");

  const timeOnly = new Date();

  timeOnly.setHours(+hour);
  timeOnly.setMinutes(+minute - 1);

  return (
    <div className={scss.Date}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.column}>
            <h2>Свободные даты</h2>
            <p>
              Настройки применяются ко всем ночам, если не выбраны конкретные
              даты
            </p>

            <h3>Длина поездки</h3>
            <div className={scss.inputGroup}>
              <span>Минимум ночей</span>
              <input
                type="number"
                {...register("minNight", { required: true })}
              />
            </div>
            <div className={scss.inputGroup}>
              <span>Максимальное число ночей</span>
              <input
                type="number"
                {...register("maxNight", { required: true })}
              />
            </div>
          </div>

          <div className={scss.column}>
            <h2>Время заезда</h2>
            <p>
              Гости могут забронировать жилье в день прибытия до указанного
              часа.
            </p>
            <div className={scss.time}>
              <Clock
                value={timeOnly}
                renderNumbers={true}
                size={150}
                secondHandWidth={0}
                secondHandLength={0}
                secondHandOppositeLength={0}
              />
              <div className={scss.timeGroup}>
                <input
                  className={scss.timeInput}
                  {...register("hourHandle")}
                  type="text"
                  inputMode="numeric"
                  onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    let digits = input.value.replace(/\D/g, "");
                    setValue("hourHandle", digits);
                    let value = parseInt(digits);
                    if (value > 23) input.value = "23";
                    if (value < 0 || input.value == "") input.value = "00";
                    if (input.value.toString().length > 2)
                      input.value = input.value.toString().slice(1);
                  }}
                />
                <span>:</span>
                <input
                  className={scss.timeInput}
                  type="text"
                  inputMode="numeric"
                  onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    let digits = input.value.replace(/\D/g, "");
                    setValue("minuteHandle", digits);
                    let value = parseInt(digits);
                    if (value > 59) input.value = "59";
                    if (value < 0 || input.value == "") input.value = "00";
                    if (input.value.toString().length > 2)
                      input.value = input.value.toString().slice(1);
                  }}
                />
                <div className={scss.timeInput}>{+hour > 12 ? "PM" : "AM"}</div>
              </div>
            </div>

            <div className={scss.switchWrapper}>
              <div className={scss.switchText}>
                <strong>Разрешить запросы на тот же день</strong>
                <p>
                  Вы будете проверять и подтверждать каждый запрос на
                  бронирование.
                </p>
              </div>
              <label className={scss.switchLabel}>
                <input
                  type="checkbox"
                  {...register("subject")}
                  onClick={() => {
                    setValue("subject", !getValues("subject"));
                  }}
                />
                <span className={scss.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDate;
