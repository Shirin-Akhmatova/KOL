import { useEffect, useState } from "react";
import FilterByType from "./filterByType/filterByType";
import WeatherWidget from "./weatherWidget/weatherWidget";
import { modalFilters } from "./cardFilters.data";
import type { IModalFilters } from "./cardFilters.interface";
import { getWeather } from "./weatherWidget/weatherWidget.data";
import type { IWeatherWidget } from "./weatherWidget/weatherWidget.interface";
import styles from "./cardFilters.module.scss";
import ModalFiltersBtn from "./modalFilters/modalFilters";

function CartFilters() {
  const [modalFiltersState, setModalFiltersState] =
    useState<IModalFilters | null>(null);
  const [weathers, setWeathers] = useState<IWeatherWidget[] | null>(null);

  useEffect(() => {
    setModalFiltersState(modalFilters);
    getWeather().then(setWeathers);
  }, []);

  if (!modalFiltersState || !weathers) return null;
  const { roomTypeFilters, ...rest } = modalFiltersState;
  return (
    <div className={styles.cartFilters}>
      <FilterByType filters={roomTypeFilters} />
      <WeatherWidget weathers={weathers} />
      <ModalFiltersBtn modalFilters={rest} />
    </div>
  );
}

export default CartFilters;
