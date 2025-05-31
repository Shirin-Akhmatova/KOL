import type { HTMLAttributes } from "react";
import styles from "./field.module.scss";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  inputBlock: React.ReactNode;
  error?: string;
  description?: string;
}

function Field({
  label,
  error,
  description,
  inputBlock,
  ...props
}: FieldProps) {
  return (
    <div className={styles.field} {...props}>
      {label && <label className={styles.label}>{label}</label>}
      {inputBlock}
      {description && <p className={styles.description}>{description}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

// Использование Field
{/* <Field
  label="Search"
  inputBlock={<Input placeholder="Search" iconBlock={<div>Arr</div>} />}
  error="Error"
  description="Description"
/>; */}


export default Field;
