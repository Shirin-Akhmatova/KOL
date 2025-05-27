import { useState, useCallback } from "react";
import { clsx } from "clsx";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import styles from "./customSelect.module.scss";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

interface CustomSelectProps<T = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export const CustomSelect = <T,>({
  options,
  value,
  onChange,
  className,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false), isOpen);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? "Выберите...";

  const handleSelect = useCallback(
    (newValue: T) => {
      onChange(newValue);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div className={clsx(styles.selectWrapper, className)} ref={ref}>
      <div
        className={styles.selectInput}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
        <span className={`${styles.arrow} ${isOpen ? styles.active : ""}`}>
          <img src="/imgs/svgs/arrow_down.svg" alt="arrow" />
        </span>
      </div>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={String(option.value)}
              className={clsx(styles.option, {
                [styles.selected]: option.value === value,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
