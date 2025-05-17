import React, { useState } from "react";
import styles from "./CustomInput.module.scss";
import calendarIcon from "../../assets/icons/Calendar today.svg";

interface CustomInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
  className?: string;
  textColor?: string;
  borderColor?: string;
  helperText?: string;
  errorText?: string;
  showCalendarIcon?: boolean;
  iconRight?: React.ReactNode;
  CalendarComponent?: React.FC<{ onSelect: (date: string) => void }>;
  onDateChange?: (date: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  style,
  className,
  textColor = "#000",
  borderColor = "#222",
  helperText,
  errorText,
  showCalendarIcon = false,
  iconRight,
  CalendarComponent,
  onDateChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const showError = !!errorText;

  // Убираем showLabel — не рендерим label над инпутом

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const handleDateSelect = (date: string) => {
    onDateChange?.(date);
    setShowCalendar(false);
  };

  return (
    <div className={`${styles.inputWrapper} ${className || ""}`}>
      {/* Убираем вывод label над инпутом */}

      <div className={styles.inputContainer}>
        <input
          type={type || "text"}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${
            value.length > 0 ? styles.filled : ""
          } ${showError ? styles.errorInput : ""}`}
          placeholder={placeholder || label} // плейсхолдер по дефолту — label
          style={{
            height: "52px",
            color: textColor,
            border: `1px solid ${showError ? "#d32f2f" : borderColor}`,
            ...style,
          }}
        />

        {showCalendarIcon && (
          <button
            type="button"
            className={styles.calendarButton}
            onClick={toggleCalendar}
          >
            <img src={calendarIcon} alt="calendar" />
          </button>
        )}

        {iconRight && (
          <div
            className={styles.iconRight}
            style={{
              right: showCalendarIcon ? "40px" : "12px",
            }}
          >
            {iconRight}
          </div>
        )}

        {showCalendar && CalendarComponent && (
          <div className={styles.calendarWrapper}>
            <CalendarComponent onSelect={handleDateSelect} />
          </div>
        )}
      </div>

      {showError ? (
        <div className={styles.errorText}>{errorText}</div>
      ) : helperText ? (
        <div className={styles.helperText}>{helperText}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;
