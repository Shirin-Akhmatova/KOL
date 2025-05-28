import styles from "./customButton.module.scss";
import { clsx } from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color:
    | "dark"
    | "primary"
    | "destructive"
    | "secondary"
    | "orangeGradientShine";
  variant?: "outline" | "solid";
  icon?: React.ReactNode;
}

function CustomButton({
  color,
  variant = "solid",
  className,
  children,
  icon,
  ...props
}: CustomButtonProps) {
  const isHaveIcon = icon ? styles.icon : false;
  const colorStyle = styles[color];
  return (
    <button
      className={clsx(
        styles.button,
        colorStyle,
        styles[variant],
        isHaveIcon,
        className
      )}
      {...props}
    >
      {children}
      {isHaveIcon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

/// Варианты использования
{
  /* 
  <CustomButton variant="solid" color="primary">
    text
  </CustomButton>
  <CustomButton variant="outline" color="primary">
    text
  </CustomButton>
  <CustomButton variant="outline" color="orangeGradientShine">
    text
  </CustomButton> */
}
export default CustomButton;
