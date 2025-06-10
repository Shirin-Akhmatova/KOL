// import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import globalStyles from "../../cardFilters.module.scss";

interface IMapFilterProps {
  title: string;
}

function MapFilter({ title }: IMapFilterProps) {
  return (
    <div>
      <h3 className={`${globalStyles.title} ${globalStyles.mb20}`}>{title}</h3>
      <MapWithCoords />
    </div>
  );
}

function MapWithCoords() {
  return (
    <div></div>
    // <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API }}>
    //   <Map
    //     className={styles.map}
    //     defaultState={{ center: [41.97, 77.29], zoom: 7 }}
    //     width="100%"
    //     height="100%"
    //     instanceRef={(ref) => {
    //       if (ref) mapRef.current = ref;
    //       setIsMapReady(true);
    //     }}
    //   >
    //     <ZoomControl options={{ position: { right: 10, top: 10 } }} />
    //     {getCoords && (
    //       <Placemark
    //         geometry={[getCoords.lat, getCoords.lng]}
    //         options={{
    //           preset: "islands#violetStretchyIcon",
    //           iconColor: "#ff5a5f",
    //         }}
    //       />
    //     )}
    //   </Map>
    // </YMaps>
  );
}

export default MapFilter;
