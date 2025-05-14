import FilterByType from "./filterByType/filterByType";
import ModalFilters from "./modalFilters/modalFilters";
import WeatherWidget from "./weatherWidget/weatherWidget";

function CartFilters() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <FilterByType />
      <WeatherWidget />
      <ModalFilters />
    </div>
  );
}

export default CartFilters;
