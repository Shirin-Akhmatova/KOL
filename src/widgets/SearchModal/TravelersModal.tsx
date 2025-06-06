import { useState } from "react";
import styles from "./TravelersModal.module.scss";

interface TravelersModalProps {
  onClose: () => void;
}

function TravelersModal({ onClose }: TravelersModalProps) {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const handleChange = (
    type: "adults" | "children" | "infants",
    action: "inc" | "dec"
  ) => {
    if (type === "adults") {
      setAdults((prev) => Math.max(1, prev + (action === "inc" ? 1 : -1)));
    } else if (type === "children") {
      setChildren((prev) => Math.max(0, prev + (action === "inc" ? 1 : -1)));
    } else if (type === "infants") {
      setInfants((prev) => Math.max(0, prev + (action === "inc" ? 1 : -1)));
    }
  };

  const renderCounter = (
    count: number,
    type: "adults" | "children" | "infants"
  ) => (
    <div className={styles.counter}>
      <button onClick={() => handleChange(type, "dec")}>−</button>
      <span>{count}</span>
      <button onClick={() => handleChange(type, "inc")}>+</button>
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
