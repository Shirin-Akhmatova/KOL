import type { IWeatherWidget } from "./weatherWidget.interface";

const weatherapi = import.meta.env.VITE_WEATHER_API;

const getWeather = async (): Promise<IWeatherWidget[]> => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${weatherapi}&q=Issyk-Kul&days=7&aqi=no&alerts=no`
  );
  const data = await response.json();

  const days: IWeatherWidget[] = data.forecast.forecastday.map((day: any) => {
    const dateObj = new Date(day.date);
    const weekday = dateObj.toLocaleDateString("ru-RU", { weekday: "short" });
    const isDay = data.current.is_day === 1 ? "day" : "night";
    const match = day.day.condition.icon.match(/(\d+)\.png$/);
    const iconId = match ? Number(match[1]) : null;
    return {
      date: day.date,
      weekday: weekday,
      temp: {
        min: day.day.mintemp_c,
        max: day.day.maxtemp_c,
      },
      icon: `https:${day.day.condition.icon}`,
      iconId,
      condition: day.day.condition.text,
      city: data.location.name,
      timeOfDay: isDay,
    };
  });
  return days;
};
export { getWeather };
