import { useState } from "react";
import "react-clock/dist/Clock.css";
import scss from "./Date.module.scss";
import Clock from "react-clock";

const ChooseDate = () => {
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");

  const timeOnly = new Date();

  timeOnly.setHours(Number(hours));
  timeOnly.setMinutes(Number(minutes));

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
              <input type="number" defaultValue={1} />
            </div>
            <div className={scss.inputGroup}>
              <span>Максимальное число ночей</span>
              <input type="number" defaultValue={365} />
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
                size={200}
                secondHandWidth={0}
                secondHandLength={0}
                secondHandOppositeLength={0}
              />
              <div className={scss.timeGroup}>
                <input
                  className={scss.timeInput}
                  type="number"
                  value={+hours > 23 ? "00" : hours.slice(hours.length - 2)}
                  onChange={(e) => setHours(e.target.value)}
                />
                <span>:</span>
                <input
                  className={scss.timeInput}
                  type="number"
                  value={
                    +minutes > 59 ? "00" : minutes.slice(minutes.length - 2)
                  }
                  onChange={(e) => setMinutes(e.target.value)}
                />
                <div className={scss.timeInput}>
                  {+hours > 12 ? "PM" : "AM"}
                </div>
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
                <input type="checkbox" />
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
