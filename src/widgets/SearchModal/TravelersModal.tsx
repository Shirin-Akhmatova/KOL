import { useState } from "react";
import styles from "./TravelersModal.module.scss";
import increment from "../../assets/icons/plus-circle.svg";
import decrement from "../../assets/icons/minus-circle.svg";

interface TravelersModalProps {
  onClose: () => void;
}

function TravelersModal({ onClose }: TravelersModalProps) {
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const handleChange = (
    type: "adults" | "children" | "infants",
    action: "inc" | "dec"
  ) => {
    if (type === "adults") {
      setAdults((prev) =>
        action === "inc" ? Math.min(16, prev + 1) : Math.max(0, prev - 1)
      );
    } else if (type === "children") {
      if (action === "inc") {
        setChildren((prevChildren) => {
          if (prevChildren < 15) {
            if (adults === 0) {
              setAdults(1);
            }
            return prevChildren + 1;
          }
          return prevChildren;
        });
      } else {
        setChildren((prevChildren) => Math.max(0, prevChildren - 1));
      }
    } else if (type === "infants") {
      if (action === "inc") {
        setInfants((prevInfants) => {
          if (prevInfants < 5) {
            if (adults === 0) {
              setAdults(1);
            }
            return prevInfants + 1;
          }
          return prevInfants;
        });
      } else {
        setInfants((prevInfants) => Math.max(0, prevInfants - 1));
      }
    }
  };

  const renderCounter = (
    count: number,
    type: "adults" | "children" | "infants"
  ) => (
    <div className={styles.counter}>
      <button onClick={() => handleChange(type, "dec")} aria-label="Уменьшить">
        <img src={decrement} alt="minus icon" />
      </button>
      <span>{count}</span>
      <button onClick={() => handleChange(type, "inc")} aria-label="Увеличить">
        <img src={increment} alt="plus icon" />
      </button>
    </div>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.body}>
          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Взрослые</p>
              <p className={styles.description}>От 13 лет</p>
            </div>
            {renderCounter(adults, "adults")}
          </div>

          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Дети</p>
              <p className={styles.description}>Возраст от 2 до 12</p>
            </div>
            {renderCounter(children, "children")}
          </div>

          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Младенцы</p>
              <p className={styles.description}>Младше 2</p>
            </div>
            {renderCounter(infants, "infants")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelersModal;
