function getCustomIconByIdAndDayTime(
  id: number,
  dayTime: "day" | "night",
  current: boolean = false
): string | null {
  const iconMap: { [key: number]: string } = {
    // ☀️ clear_sky
    113: "clear_sky",

    // 🌤 few_clouds
    116: "few_clouds",

    // 🌥 scattered_clouds
    119: "scattered_clouds",

    // ☁️ broken_clouds
    122: "broken_clouds",

    // 🌫 mist
    143: "mist",
    248: "mist",
    260: "mist",

    // 🌦 shower_rain
    263: "shower_rain",
    293: "shower_rain",
    353: "shower_rain",

    // 🌧 rain
    176: "rain",
    296: "rain",
    299: "rain",
    302: "rain",
    305: "rain",
    308: "rain",
    311: "rain",
    314: "rain",
    356: "rain",
    359: "rain",

    // ⛈ thunderstorm
    200: "thunderstorm",
    386: "thunderstorm",
    389: "thunderstorm",

    // 🌨 snow
    179: "snow",
    182: "snow",
    185: "snow",
    227: "snow",
    230: "snow",
    317: "snow",
    320: "snow",
    323: "snow",
    326: "snow",
    329: "snow",
    332: "snow",
    335: "snow",
    338: "snow",
    350: "snow",
    362: "snow",
    365: "snow",
    368: "snow",
    371: "snow",
    374: "snow",
    377: "snow",
    392: "snow",
    395: "snow",
  };

  const iconName = iconMap[id];

  if (iconName) {
    if (current) {
      return `/imgs/weather/current/${dayTime}/${iconName}.svg`;
    }
    return `/imgs/weather/${dayTime}/${iconName}.svg`;
  }

  return null;
}

export { getCustomIconByIdAndDayTime };
