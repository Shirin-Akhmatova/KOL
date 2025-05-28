interface IWeatherWidget {
  date: string;
  weekday: string;
  temp: {
    min: number;
    max: number;
  };
  icon: string;
  iconId: number;
  condition: string;
  city: string;
  timeOfDay: "night" | "day";
}

export type { IWeatherWidget };
