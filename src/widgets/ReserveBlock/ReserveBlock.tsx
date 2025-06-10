import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { format } from "date-fns";
import Calendar from "../Calendar/CalendarUp";

type DatePicker = {
  startDate: Date | null;
  endDate: Date | null;
};

function ReserveBlock() {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState<DatePicker>({
    startDate: null,
    endDate: null,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // плавное появление
  }, []);

  return (
    <div
      className={`${styles["reserve-block"]} ${
        isVisible ? styles.show : styles.hide
      }`}
    >
      <div className={styles.reserveOwerlay}>
        <div className={styles.reserveHeader}>
          <div className={styles.reservePriceBlock}>
            <span className={styles.reservePrice}>$500</span>
            <span className={styles.reserveDiscountPrice}>$440</span>
            <span className={styles.reserveTime}>night</span>
          </div>
          <div className={styles.ratingBlock}>
            <div className={styles.stars}>
              <img src="/imgs/svgs/star.svg" alt="star" />
              4.44
            </div>
            <div className={styles.reviewsDot}></div>
            <div className={styles.reviews}>337 reviews</div>
          </div>
        </div>

        <div>
          <div className={styles.datePicker}>
            <div
              className={`${styles.datePickerInput} ${styles.input} ${styles.start}`}
              onClick={() => setShowPicker(!showPicker)}
            >
              <span className={styles.inputTitle}>CHECK-IN</span>
              {datePicker.startDate
                ? format(datePicker.startDate, "dd/MM/yyyy")
                : "Выберите день"}
            </div>
            <div
              className={`${styles.datePickerInput} ${styles.input} ${styles.end}`}
              onClick={() => setShowPicker(!showPicker)}
            >
              <span className={styles.inputTitle}>CHECKOUT</span>
              {datePicker.endDate
                ? format(datePicker.endDate, "dd/MM/yyyy")
                : "Выберите день"}
            </div>
            {showPicker && (
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: "100%",
                  zIndex: 10,
                }}
              >
                <Calendar
                  values={datePicker}
                  onChangeValue={setDatePicker}
                  className={styles.reserveCalendar}
                  onClose={() => {
                    setShowPicker(false);
                  }}
                />
              </div>
            )}
          </div>
          <div className={`${styles.input} ${styles.bottom}`}>
            <span className={styles.inputTitle}>GUESTS</span>1 guest
          </div>
        </div>

        <button className={styles.reserveBtn}>Reserve</button>
        <p className={styles.reserveWarning}>You won’t be charged yet</p>
        <ol className={styles.reserveInfo}>
          <li className={styles.reserveInfoLi}>
            <span>500 x 5 nights</span>
            <p>$2,500</p>
          </li>
          <li className={styles.reserveInfoLi}>
            <span>Long stay discount</span>
            <p className={styles.active}>-$300</p>
          </li>
          <li className={styles.reserveInfoLi}>
            <span>Cleaning fee</span>
            <p>$200</p>
          </li>
          <li className={styles.reserveInfoLi}>
            <span>Service fee</span>
            <p>$0</p>
          </li>
        </ol>
        <hr className={styles.hr} />
        <div className={styles.reserveTotal}>
          <span>Service fee</span>
          <p>$0</p>
        </div>
      </div>
    </div>
  );
}

export default ReserveBlock;
