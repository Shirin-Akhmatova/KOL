export interface PlaceCard {
  id: number;
  images: string[];
  title: string;
  place: string;
  data: string;
  price: number;
  day: number;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}
