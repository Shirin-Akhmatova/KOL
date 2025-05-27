import React from "react";
import styles from "./CustomButton.module.scss";

interface CustomButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  buttonColor?: string;
  textColor?: string;
  borderColor?: string;
  iconRight?: React.ReactNode;
  disabled?: boolean;  // добавили проп disabled
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onClick,
  style,
  className,
  buttonColor,
  textColor,
  borderColor,
  iconRight,
  disabled = false, // по умолчанию false
}) => {
  // Если disabled, кнопка серая и курсор "неактивный"
  const defaultStyle: React.CSSProperties = {
    height: "52px",
    background: disabled ? "#ccc" : buttonColor,
    color: disabled ? "#888" : textColor || "#000",
    border: `1px solid ${disabled ? "#ccc" : borderColor || "#222222"}`,
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  // При disabled onClick не вызываем
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.customButton} ${className || ""}`}
      style={defaultStyle}
      onClick={handleClick}
      disabled={disabled}  // атрибут disabled html
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
};

export default CustomButton;
