import type { PlaceCard } from "../../shared/types/PlaceCard";

const mockData: PlaceCard[] = [
  {
    id: 1,
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-1208478853883571250/original/03aef6b8-3992-463d-94ca-2422c2d82757.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/cba06c3e-f0e0-4ef0-b991-aa6fd2348c50.jpg?im_w=720",
    ],
    title: "Moss Beach (Калифорния, США)",
    place: "пляж и бухта",
    data: "7–12 июнь",
    price: 149721,
    day: 5,
    rating: 4.8,
    coordinates: {
      lat: 37.5255,
      lng: -122.515,
    },
  },
  {
    id: 2,
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-36774428/original/15110762-267f-4a08-88ae-2d9d3603284d.jpeg?im_w=720",
    ],
    title: "Villa Sea View, Турция",
    place: "дом с видом на море",
    data: "10–15 июнь",
    price: 124050,
    day: 5,
    rating: 4.9,
    coordinates: {
      lat: 41.015137,
      lng: 28.97953,
    },
  },
  {
    id: 3,
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-804959254707180514/original/534bd9ae-d1b0-4f85-b7fb-b459fd07d153.jpeg?im_w=720",
    ],
    title: "Апартаменты в центре Стамбула",
    place: "центр города",
    data: "1–6 июнь",
    price: 98000,
    day: 5,
    rating: 4.7,
    coordinates: {
      lat: 41.012024,
      lng: 28.963055,
    },
  },
  {
    id: 4,
    images: [
      "https://a0.muscache.com/im/pictures/8c71e0de-02f2-4fd9-b522-63b6cf4e957e.jpg?im_w=720",
    ],
    title: "Дом в лесу",
    place: "природа и тишина",
    data: "5–10 июнь",
    price: 135000,
    day: 5,
    rating: 4.95,
    coordinates: {
      lat: 41.022255,
      lng: 28.984983,
    },
  },
];

export default mockData;
