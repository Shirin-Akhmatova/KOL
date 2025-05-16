interface IWeatherWidget {
  date: string;
  weekday: string;
  temp: {
    min: number;
    max: number;
  };
  icon: string;
  condition: string;
  city: string;
}

export type { IWeatherWidget };
