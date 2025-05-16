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
  CalendarComponent,
  onDateChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const isFilled = value.length > 0;
  const showError = !!errorText;

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const handleDateSelect = (date: string) => {
    onDateChange?.(date);
    setShowCalendar(false);
  };

  return (
    <div className={`${styles.inputWrapper} ${className || ""}`}>
      {label && (
        <label className={`${styles.label} ${isFilled ? styles.floating : ""}`}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          type={type || "text"}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${isFilled ? styles.filled : ""} ${
            showError ? styles.errorInput : ""
          }`}
          placeholder={placeholder}
          style={{
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
