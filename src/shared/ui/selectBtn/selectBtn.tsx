import type { ButtonHTMLAttributes } from "react";
import styles from "./selectBtn.module.scss";
interface SelectBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  active?: boolean;
}

function SelectBtn({
  icon,
  className,
  children,
  active,
  ...props
}: SelectBtnProps) {
  return (
    <button
      className={`${styles.selectBtn} ${
        active ? styles.selectBtnActive : ""
      } ${className}`}
      {...props}
    >
      {icon && <img className={styles.selectBtnIcon} src={icon} alt="icon" />}
      <div className={styles.selectBtnText}>{children}</div>
    </button>
  );
}

export default SelectBtn;
