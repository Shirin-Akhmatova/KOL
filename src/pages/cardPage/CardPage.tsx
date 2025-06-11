import "./cardPage.scss";
import HotelGallery from "../../widgets/HotelGallery/HotelGallery";
import Feedbacks from "../../widgets/feedbacks/Feedbacks";
import Map from "../../widgets/map/Map";
import { useParams } from "react-router";

import { blocks } from "@/widgets/mockData";

function CardPage() {
  const { id } = useParams();
  const currentCotadge = blocks[Number(id)];
  return (
    <div className="cardPage">
      <HotelGallery currentCotadge={currentCotadge}/>
      <Feedbacks />
      <Map />
    </div>
  );
}

export default CardPage;
