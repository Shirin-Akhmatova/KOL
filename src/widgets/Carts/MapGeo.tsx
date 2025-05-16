import { blocks } from "../mockData";
import scss from "./Carts.module.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapGeo = () => {
  return (
    <div className={scss.map}>
      <YMaps query={{ apikey: "655b74b4-94c5-4212-b86d-bd8f6fdae225" }}>
        <Map
          defaultState={{ center: [41.97, 77.29], zoom: 7 }}
          width="100%"
          height="500px"
          position="sticky"
        >
          {blocks.map((store, idx) => (
            <Placemark
              key={idx}
              geometry={store.coordinates}
              properties={{
                iconContent: `${store.price.toLocaleString("ru-RU")} сом`,
              }}
              options={{
                preset: "islands#violetStretchyIcon",
                iconColor: "#ff5a5f",
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapGeo;
