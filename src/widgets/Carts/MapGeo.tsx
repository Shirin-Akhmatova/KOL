import { blocks } from "../mockData";
import scss from "./Carts.module.scss";

const MapGeo = () => {
  return (
    <div className={scss.map}>
      <iframe
        width="100%"
        height="400"
        src="https://www.openstreetmap.org/export/embed.html?bbox=37.61,55.74,37.65,55.77&layer=mapnik&marker=55.76,37.63"
      ></iframe>
    </div>
  );
};

export default MapGeo;
