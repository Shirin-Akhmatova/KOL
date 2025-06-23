import "./home.scss";
import { useState } from "react";
import Carts from "../../widgets/Carts/Carts";
import MapBtn from "@/shared/ui/buttons/selectBtn/MapBtn";
import MapGeo from "@/widgets/Carts/MapGeo";
import CardFilters from "./CardFilters/CardFilters";
import { blocks } from "@/widgets/mockData";
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CardFilters />
      {isOpen ? <MapGeo /> : <Carts cardList={blocks} />}
      <MapBtn setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

export default Home;
