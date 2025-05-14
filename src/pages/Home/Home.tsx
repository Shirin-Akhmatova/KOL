import "./home.scss";
import Carts from "../../widgets/Carts/Carts";
import CartFilters from "./CartFilters/CartFilters";
function Home() {
  return (
    <div>
      <CartFilters />
      <Carts />
    </div>
  );
}

export default Home;
