import { useState } from "react";
import scss from "./mapBtn.module.scss";
import mapIcon from "../../../../assets/icons/mapIcon.svg";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const MapBtn: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOpen(!isOpen);
    }, 1000); 
  };

  return (
    <button onClick={handleClick} className={scss.mapBtn}>
      {loading ? (
        <div className={scss.loadingDots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <>
          Показать карту <img src={mapIcon} alt="icon map" />
        </>
      )}
    </button>
  );
};

export default MapBtn;
