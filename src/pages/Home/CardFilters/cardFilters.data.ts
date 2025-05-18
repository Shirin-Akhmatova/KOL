import type { IModalFilters, IRoomTypeFilter } from "./cardFilters.interface";

const roomTypeFilters: IRoomTypeFilter[] = [
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

const room = ["Спальни", "Кровати", "Ванные комнаты"];

const facilities = [
  {
    facilitiesTitle: "Wi-Fi",
    icon: "imgs/services/wifi.svg",
  },
  {
    facilitiesTitle: "Кондиционер",
    icon: "imgs/services/air-conditioning.svg",
  },
  {
    facilitiesTitle: "Кухня",
    icon: "imgs/services/kitchen.svg",
  },
  {
    facilitiesTitle: "Отопление",
    icon: "imgs/services/heating.svg",
  },
];

const booking = [
  {
    bookingTitle: "Мгновенное бронирование",
    icon: "imgs/services/wifi.svg",
  },
  {
    bookingTitle: "Можно с питомцами",
    icon: "imgs/services/wifi.svg",
  },
  {
    bookingTitle: "Самостоятельное заселение",
    icon: "imgs/services/wifi.svg",
  },
];

const recommendation = [
  {
    recommendationTitle: "Чтото там",
    recommendationDescription: "Описание чего-то там",
    icon: "imgs/services/wifi.svg",
  },
  {
    recommendationTitle: "Рекомендуемые коттеджи",
    recommendationDescription: "Самое любимое жилье на KÖL",
    icon: "imgs/services/wifi.svg",
  },
];

const generateRandomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

const modalFilters = (): IModalFilters => {
  function priceArray(maxPrice: number, maxCottage: number, count: number) {
    const arr = new Array();
    for (let i = 0; i < count; i++) {
      const price = generateRandomNumber(0, maxPrice);
      const cottage = generateRandomNumber(20, maxCottage);
      const info = {
        price,
        cottage,
      };
      arr.push(info);
    }
    return arr;
  }
  const price = priceArray(1000000, 100, 40);

  return {
    roomTypeFilters,
    price,
    room,
    facilities,
    booking,
    recommendation,
  };
};
export { modalFilters };
