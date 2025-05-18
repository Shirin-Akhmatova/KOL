import "./home.scss";
import { useState } from "react";
import Carts from "../../widgets/Carts/Carts";
import MapBtn from "@/shared/ui/buttons/selectBtn/MapBtn";
import MapGeo from "@/widgets/Carts/MapGeo";
import CardFilters from "./CardFilters/CardFilters";
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CardFilters />
      {isOpen ? <MapGeo /> : <Carts />}
      <MapBtn setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

export default Home;
