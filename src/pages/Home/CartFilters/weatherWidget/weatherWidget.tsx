import { useEffect, useState } from "react";
import type { IWeatherWidget } from "./weatherWidget.interface";
import styles from "./weatherWidget.module.scss";
import { getWeather } from "./weatherWidget.data";

function WeatherWidget() {
  const [showWeather, setShowWeather] = useState<boolean>(false);
  const [weathers, setWeathers] = useState<IWeatherWidget[] | null>(null);
  useEffect(() => {
    getWeather().then(setWeathers);
  }, []);

  if (!weathers) return;
  return (
    <>
      <div className={`${styles.weatherWidget}`}>
        <div
          className={`${styles.weatherWidgetList} ${
            showWeather ? styles.active : ""
          }`}
        >
          {weathers?.map((weather) => (
            <WeatherItem weather={weather} />
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
