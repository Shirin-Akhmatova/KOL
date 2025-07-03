import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import KolLogo from "@/assets/icons/KOL.svg";
// import Magnifier from "@/assets/icons/magnifyingglass 2.svg";
// import close from "@/../public/imgs/svgs/close.svg";
import "leaflet/dist/leaflet.css";
import scss from "./IndicateMap.module.scss";
import { useFormContext } from "react-hook-form";
import type { FormData } from "@/pages/CreateService/CreateService";

const ClickHandler = ({
  onClick,
}: {
  onClick: (latlng: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
      onClick(latlng);
    },
  });
  return null;
};

const IndicateMap = () => {
  const { setValue, getValues, watch } = useFormContext<FormData>();

  const marker = watch("location.cordinates");
  const handleMapClick = async (latlng: [number, number]) => {
    setValue("location.cordinates", latlng);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng[0]}&lon=${latlng[1]}`
      );
      const data = await response.json();
      setValue("location.locationName", data.display_name);
    } catch (error) {
      setValue("location.locationName", "Ошибка при определении места");
    }
  };

  return (
    <div className="container">
      <div className={scss.IndicateMap}>
        <h1>Местоположение</h1>
        <p>{getValues("location.locationName") || "Выберите место на карте"}</p>
        <input type="text" />
        <MapContainer center={marker} zoom={8} className={scss.map}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onClick={handleMapClick} />
          {marker && <Marker position={marker} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default IndicateMap;
