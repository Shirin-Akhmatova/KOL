import React from "react";
import clsx from "clsx";
import styles from "./switcher.module.scss";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <label
      className={clsx(styles.switchWrapper, className, {
        [styles.disabled]: disabled,
      })}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.slider} />
    </label>
  );
};
