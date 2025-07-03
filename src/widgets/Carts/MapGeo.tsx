import Map from "@/shared/ui/Map/Map";
import style from "./MapGeo.module.scss";
const MapGeo = () => {
  return (
    <div className="container">
      <div className={style.MapGeo}>
        <Map />
      </div>
    </div>
  );
};

export default MapGeo;
