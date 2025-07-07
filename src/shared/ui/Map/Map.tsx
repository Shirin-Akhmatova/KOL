import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { blocks } from "@/widgets/mockData";
import L from "leaflet";
import scss from "./Map.module.scss";
import Card from "../Card/Card";

const IndicateMap = () => {
  const center: [number, number] = [42.4602, 77.5085];

  return (
    <div className={scss.IndicateMap}>
      <MapContainer center={center} zoom={8} className={scss.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {blocks.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.coordinates}
            icon={L.divIcon({
              className: scss.customPriceIcon,
              html: `<div>${loc.price} сом</div>`,
              iconSize: [0, 0],
            })}
          >
            <Popup offset={[0, 0]} className={scss.popup}>
              {blocks.map((block) => (
                <Card
                  block={block.id === loc.id ? block : null}
                  mapModalBlock={true}
                  height="200px"
                  key={block.id}
                />
              ))}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndicateMap;
