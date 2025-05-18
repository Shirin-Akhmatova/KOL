import { useState } from "react";
import type { IWeatherWidget } from "./weatherWidget.interface";
import styles from "./weatherWidget.module.scss";

function WeatherWidget({ weathers }: { weathers: IWeatherWidget[] }) {
  const [showWeather, setShowWeather] = useState<boolean>(false);

  return (
    <>
      <div className={`${styles.weatherWidget}`}>
        <button
          className={styles.weatherWidgetArrow}
          onClick={() => setShowWeather((prev) => !prev)}
        >
          <img
            className={`${styles.weatherWidgetArrowImg} ${
              showWeather ? styles.close : ""
            }`}
            src="/imgs/svgs/arrow_left.svg"
            alt="weather"
          />
        </button>
        <div
          className={`${styles.weatherWidgetList} ${
            showWeather ? styles.active : ""
          }`}
        >
          {weathers?.map((weather) => (
            <WeatherItem key={weather.date} weather={weather} />
          ))}
        </div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setShowWeather((prev) => !prev)}
        >
          <CurrentWeather weather={weathers[0]} />
        </button>
      </div>
    </>
  );
}

function WeatherItem({ weather }: { weather: IWeatherWidget }) {
  const { weekday, icon, condition, temp } = weather;
  return (
    <div className={styles.weatherItem}>
      <span className={styles.weatherItemSpan}>{weekday}</span>
      <img className={styles.weatherItemImg} src={icon} alt={condition} />
      <span className={styles.weatherItemSpan}>
        {Math.round(temp.max)}&#176;
      </span>
    </div>
  );
}

function CurrentWeather({ weather }: { weather: IWeatherWidget }) {
  const { icon, condition, temp, city } = weather;
  return (
    <div className={styles.currentWeather}>
      <img className={styles.currentWeatherImg} src={icon} alt={condition} />
      <div className={styles.currentWeatherInfo}>
        <span className={styles.currentWeatherInfoCity}>{city}</span>
        <span className={styles.currentWeatherInfoTemp}>
          {Math.round(temp.max)}&#176;C
        </span>
      </div>
    </div>
  );
}

export default WeatherWidget;
