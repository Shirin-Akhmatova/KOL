import "./home.scss";
import { useState } from "react";
import Carts from "../../widgets/Carts/Carts";
import MapBtn from "@/shared/ui/buttons/selectBtn/MapBtn";
import MapGeo from "@/widgets/Carts/MapGeo";
import Payment from "@/widgets/payment/Payment";
// import CartFilters from "./CartFilters/CartFilters";
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* <CartFilters /> */}
      {isOpen ? <MapGeo /> : <Carts />}
      <MapBtn setIsOpen={setIsOpen} isOpen={isOpen} />
      <Payment />
    </div>
  );
}

export default Home;
