import scss from "./mapBtn.module.scss";
import mapIcon from "../../../../assets/icons/mapIcon.svg";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const MapBtn: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)} className={scss.mapBtn}>
      Показать карту <img src={mapIcon} alt="icon map" />
    </button>
  );
};

export default MapBtn;
