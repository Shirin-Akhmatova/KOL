import { useState } from "react";
import { DateRange, type Range } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./style.module.scss";

interface ReserveBlockProps {
  expanded?: boolean;
}

function ReserveBlock({ expanded = false }: ReserveBlockProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className={styles.reserveBlock}>
      <div className={styles.reserveOverlay}>
        {/* Компактная верхняя часть (всегда видна) */}
        <div className={styles.compactHeader}>
          <div className={styles.priceContainer}>
            <span className={styles.originalPrice}>$500</span>
            <span className={styles.discountedPrice}>$440</span>
            <span className={styles.perNight}>night</span>
          </div>
          <div className={styles.ratingContainer}>
            <span className={styles.ratingValue}>4.44</span>
            <span className={styles.dot}>·</span>
            <span className={styles.reviews}>337 reviews</span>
          </div>
        </div>

        {/* Развернутая часть (только когда expanded=true) */}
        {expanded && (
          <>
            <div className={styles.datePicker}>
              <div 
                className={styles.dateInput}
                onClick={() => setShowPicker(!showPicker)}
              >
                <span className={styles.inputLabel}>CHECK-IN</span>
                <div className={styles.dateValue}>{format(range[0].startDate!, "dd/MM/yyyy")}</div>
              </div>
              <div 
                className={styles.dateInput}
                onClick={() => setShowPicker(!showPicker)}
              >
                <span className={styles.inputLabel}>CHECKOUT</span>
                <div className={styles.dateValue}>{format(range[0].endDate!, "dd/MM/yyyy")}</div>
              </div>
              {showPicker && (
                <div className={styles.dateRangePicker}>
                  <DateRange
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>

            <div className={styles.guestsInput}>
              <span className={styles.inputLabel}>GUESTS</span>
              <div className={styles.guestsValue}>1 guest</div>
            </div>

            <button className={styles.reserveButton}>Reserve</button>
            <p className={styles.disclaimer}>You won't be charged yet</p>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>500 x 5 nights</span>
                <span>$2,500</span>
              </div>
              <div className={styles.priceRow}>
                <span>Long stay discount</span>
                <span className={styles.discount}>-$300</span>
              </div>
              <div className={styles.priceRow}>
                <span>Cleaning fee</span>
                <span>$200</span>
              </div>
              <div className={styles.priceRow}>
                <span>Service fee</span>
                <span>$0</span>
              </div>
            </div>

            <div className={styles.totalContainer}>
              <span>Total before taxes</span>
              <span>$2,400</span>
            </div>
          </>
        )}

        {/* Кнопка бронирования для компактного режима */}
        {!expanded && (
          <button className={styles.compactReserveButton}>Забронировать</button>
        )}
      </div>
    </div>
  );
}

export default ReserveBlock;