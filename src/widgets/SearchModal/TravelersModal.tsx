import styles from "./TravelersModal.module.scss";

interface TravelersModalProps {
  adults: number;
  children: number;
  infants: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  setInfants: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}

function TravelersModal({
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants,
  onClose,
}: TravelersModalProps) {
  const MAX_ADULTS = 16;
  const MAX_CHILDREN = 15;
  const MAX_INFANTS = 5;

  const handleChange = (
    type: "adults" | "children" | "infants",
    action: "inc" | "dec"
  ) => {
    if (type === "adults") {
      setAdults((prev) => {
        const next = action === "inc" ? prev + 1 : prev - 1;
        return Math.max(0, Math.min(MAX_ADULTS, next));
      });
    } else if (type === "children") {
      setChildren((prev) => {
        const next = action === "inc" ? prev + 1 : prev - 1;
        if (action === "inc" && adults === 0) {
          setAdults(1);
        }
        return Math.max(0, Math.min(MAX_CHILDREN, next));
      });
    } else if (type === "infants") {
      setInfants((prev) => {
        const next = action === "inc" ? prev + 1 : prev - 1;
        if (action === "inc" && adults === 0) {
          setAdults(1);
        }
        return Math.max(0, Math.min(MAX_INFANTS, next));
      });
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
      <button
        onClick={() => handleChange(type, "inc")}
        disabled={count >= max || (type === "children" && adults >= MAX_ADULTS)}
      >
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
            {renderCounter(adults, "adults", MAX_ADULTS)}
          </div>

          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Дети</p>
              <p className={styles.description}>Возраст от 2 до 12</p>
            </div>
            {renderCounter(children, "children", MAX_CHILDREN)}
          </div>

          <div className={styles.group}>
            <div className={styles.labelBlock}>
              <p className={styles.label}>Младенцы</p>
              <p className={styles.description}>Младше 2</p>
            </div>
            {renderCounter(infants, "infants", MAX_INFANTS)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelersModal;
