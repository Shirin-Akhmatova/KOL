import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import globalStyles from "../../cardFilters.module.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./mapFilter.module.scss";
import useFilters from "@/shared/hooks/useFilters";

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
  const { getFilter, setFilters } = useFilters();
  const [isMapReady, setIsMapReady] = useState(false);

  const getCoords = useMemo(() => {
    const lat = getFilter("coordLat");
    const lng = getFilter("coordLng");
    return { lat, lng };
  }, [getFilter]);

  const mapRef = useRef<any>(null);

  const handleMapClick = useCallback(
    (e: any) => {
      const coords = e.get("coords");
      console.log("Одиночный клик. Координаты:", coords);
      setFilters({ coordLat: coords[0], coordLng: coords[1] });
    },
    [setFilters]
  );

  // ⛑️ Удаляем обработчик при размонтировании
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    map.events.add("click", handleMapClick);
    map.behaviors.disable("dblClickZoom");
    map.behaviors.disable("scrollZoom");

    return () => {
      map.events.remove("click", handleMapClick);
    };
  }, [handleMapClick, isMapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    return () => {
      map.destroy();
    };
  }, []);

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API }}>
      <Map
        className={styles.map}
        defaultState={{ center: [41.97, 77.29], zoom: 7 }}
        width="100%"
        height="100%"
        instanceRef={(ref) => {
          if (ref) mapRef.current = ref;
          setIsMapReady(true);
        }}
      >
        <ZoomControl options={{ position: { right: 10, top: 10 } }} />
        {getCoords && (
          <Placemark
            geometry={[getCoords.lat, getCoords.lng]}
            options={{
              preset: "islands#violetStretchyIcon",
              iconColor: "#ff5a5f",
            }}
          />
        )}
      </Map>
    </YMaps>
  );
}

export default MapFilter;
