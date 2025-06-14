import { useState } from "react";
import styles from "./TravelersModal.module.scss";

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
      setAdults((prev) => {
        const updated = action === "inc" ? prev + 1 : prev - 1;
        return Math.min(Math.max(updated, 0), 16);
      });
    } else if (type === "children") {
      if (action === "inc") {
        setChildren((prev) => {
          const newValue = Math.min(prev + 1, 15);
          if (adults === 0) setAdults(1);
          return newValue;
        });
      } else {
        setChildren((prev) => Math.max(prev - 1, 0));
      }
    } else if (type === "infants") {
      if (action === "inc") {
        setInfants((prev) => {
          const newValue = Math.min(prev + 1, 5);
          if (adults === 0) setAdults(1);
          return newValue;
        });
      } else {
        setInfants((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const renderCounter = (
    count: number,
    type: "adults" | "children" | "infants",
    max: number
  ) => (
    <div className={styles.counter}>
      <button onClick={() => handleChange(type, "dec")} disabled={count <= 0}>
        −
      </button>
      <span>{count}</span>
      <button onClick={() => handleChange(type, "inc")} disabled={count >= max}>
        +
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
              <p className={styles.description}>Возраст от 13 лет</p>
            </div>
            {renderCounter(adults, "adults", 16)}
          </div>

          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Дети</p>
              <p className={styles.description}>Возраст от 2 до 12</p>
            </div>
            {renderCounter(children, "children", 15)}
          </div>

          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Младенцы</p>
              <p className={styles.description}>Младше 2</p>
            </div>
            {renderCounter(infants, "infants", 5)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelersModal;
