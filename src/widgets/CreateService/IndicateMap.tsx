import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { blocks } from "../mockData";
import L from "leaflet";
import scss from "./IndicateMap.module.scss";
import Card from "@/shared/ui/card/Card";

const IndicateMap = () => {
  const center: [number, number] = [42.4602, 77.5085];

  return (
    <div className="container">
      <div className={scss.IndicateMap}>
        <MapContainer center={center} zoom={9} className={scss.map}>
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
              <Popup className={scss.popup}>
                {blocks.map((block) => (
                  <Card
                    block={block.id === loc.id ? block : null}
                    addLike={() => {}}
                    likes={[]}
                    mapModalBlock={true}
                    key={block.id}
                  />
                ))}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default IndicateMap;
