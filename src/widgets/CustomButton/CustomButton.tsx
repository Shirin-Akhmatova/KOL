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
}) => {
  const defaultStyle: React.CSSProperties = {
    height: "52px",
    background: buttonColor,
    color: textColor || "#000",
    border: `1px solid ${borderColor || "#222222"}`,
    ...style,
  };

  return (
    <button
      className={`${styles.customButton} ${className || ""}`}
      style={defaultStyle}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
};

export default CustomButton;
