import type { IRoomTypeFilter } from "./filterByType.interface";

const filters: IRoomTypeFilter[] = [
  {
    icon: "/imgs/svgs/family_room.svg",
    filterName: "Семейные коттеджи",
  },
  {
    icon: "/imgs/svgs/budget_room.svg",
    filterName: "Бюджетное жильё",
  },
  {
    icon: "/imgs/svgs/hotel_room.svg",
    filterName: "Гостиничные номераи",
  },
  {
    icon: "/imgs/svgs/lake_house.svg",
    filterName: "Домики у озера",
  },
  {
    icon: "/imgs/svgs/eco_tourism.svg",
    filterName: "Экотуризм",
  },
];

export { filters };
