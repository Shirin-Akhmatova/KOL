import kitchen from "@/assets/icons/kitchen.svg";
import parking from "@/assets/icons/parking.svg";
import embankment from "@/assets/icons/embankment.svg";
import sauna from "@/assets/icons/sauna.svg";
import conditioner from "@/assets/icons/conditioner.svg";
import washing from "@/assets/icons/washingMachine.svg";
import pool from "@/assets/icons/pool.svg";
import wifi from "@/assets/icons/wi-fi.svg";
import paidParking from "@/assets/icons/paidParking.svg";
import heating from "@/assets/icons/heating.svg";
import yoga from "@/assets/icons/Yogo-room.svg";
import cleaner from "@/assets/icons/cleaner.svg";
import scss from "./Amenities.module.scss";
import { useFormContext } from "react-hook-form";
import type { FormData } from "@/pages/CreateService/CreateService";

interface Options {
  icon: string;
  title: string;
}

const options: Options[] = [
  {
    icon: kitchen,
    title: "Кухня",
  },
  {
    icon: parking,
    title: "Бесплатная парковка ",
  },
  {
    icon: embankment,
    title: "Набережная",
  },
  {
    icon: sauna,
    title: "Общая сауна",
  },
  {
    icon: conditioner,
    title: "Кондиционер",
  },
  {
    icon: washing,
    title: "Стиральная машина",
  },
  {
    icon: pool,
    title: "Бассейн",
  },
  {
    icon: wifi,
    title: "Wi-Fi",
  },
  {
    icon: paidParking,
    title: "Платная парковка",
  },
  {
    icon: heating,
    title: "Отопление",
  },
  {
    icon: yoga,
    title: "Його-зал",
  },
  {
    icon: cleaner,
    title: "Химчистка",
  },
];

const Amenities = () => {
  const { setValue, watch } = useFormContext<FormData>();

  const amenities = watch("amenities");

  const handleClick = (title: string) => {
    const current = amenities || [];
    if (!current.includes(title)) {
      setValue("amenities", [...current, title]);
    } else {
      setValue(
        "amenities",
        current.filter((item) => item !== title)
      );
    }
  };

  return (
    <div className={scss.Amenities}>
      <div className="container">
        <h1>Удобства</h1>
        <div className={scss.content}>
          {options.map((option) => (
            <div
              onClick={() => handleClick(option.title)}
              className={`${scss.option} ${
                (amenities || []).includes(option.title) ? scss.active : ""
              }`}
              key={option.title}
            >
              <img src={option.icon} alt={option.title} />
              <span>{option.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
