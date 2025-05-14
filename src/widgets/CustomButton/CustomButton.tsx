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
}) => {
  const defaultStyle: React.CSSProperties = {
    background: buttonColor,
    color: textColor || "#000",
    border: `1px solid ${borderColor || "#222222"}`,
    ...style,
  };

  return (
    <div
      className={`${styles.customButton} ${className || ""}`}
      style={defaultStyle}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
      {onClick && <button onClick={onClick}></button>}
    </div>
  );
};

export default CustomButton;
