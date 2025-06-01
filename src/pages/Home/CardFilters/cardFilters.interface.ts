interface IRoomTypeFilter {
  icon: string;
  filterName: string;
}
interface IRecommendationFilter {
  icon: string;
  recommendationTitle: string;
  recommendationDescription: string;
}

interface IModalFilters {
  roomTypeFilters: IRoomTypeFilter[];
  price: IPrice[];
  room: string[];
  facilities: IFacilities[];
  booking: IBooking[];
  recommendation: IRecommendationFilter[];
}
interface IPrice {
  price: number;
  cottage: number;
}
interface IFacilities {
  facilitiesTitle: string;
  icon: string;
}
interface IBooking {
  bookingTitle: string;
  icon: string;
}
export type {
  IRoomTypeFilter,
  IModalFilters,
  IPrice,
  IFacilities,
  IBooking,
  IRecommendationFilter,
};
