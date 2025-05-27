import type {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./input.module.scss";
import { clsx } from "clsx";
import { CustomSelect, type SelectOption } from "./customSelect/customSelect";
import { Switch } from "./switcher";

type CommonProps = {
  iconBlock?: React.ReactNode;
  className?: string;
};

type AreaInputProps = {
  type: "area";
  height?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps;

type TextInputProps =
  | ({
      type: "text";
    } & InputHTMLAttributes<HTMLInputElement>) &
      CommonProps;

type SwitcherInputProps = {
  type: "switcher";
  checked: boolean;
  onChange: (checked: boolean) => void;
} & CommonProps;

type SelectInputProps<T = string> = {
  type: "select";
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  iconBlock?: React.ReactNode;
  className?: string;
} & CommonProps;

type InputProps<T = string> =
  | TextInputProps
  | SelectInputProps<T>
  | SwitcherInputProps
  | AreaInputProps;

function Input<T = string>(props: InputProps<T>) {
  switch (props.type) {
    case "text":
      return (
        <div className={styles.inputContainer}>
          {props.iconBlock && (
            <div className={styles.iconBlock}>{props.iconBlock}</div>
          )}
          <input className={clsx(styles.input, props.className)} {...props} />
        </div>
      );
    case "area":
      return (
        <div className={styles.areaContainer}>
          <textarea
            style={{
              height: props.height ? `${props.height}px` : "120px",
              ...props.style,
            }}
            className={clsx(styles.area, props.className)}
            {...props}
          />
        </div>
      );

    case "switcher":
      return <Switch checked={props.checked} onChange={props.onChange} />;
    case "select":
      return (
        <div className={styles.inputContainer}>
          {props.iconBlock && (
            <div className={styles.iconBlock}>{props.iconBlock}</div>
          )}
          <CustomSelect
            className={props.className}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
          />
        </div>
      );

    default:
      return null;
  }
}

// Варианты использования
{
/* 
<Input type="area" placeholder="Message" height={120} />

<Input type="switcher" checked={isEnabled} onChange={setIsEnabled} />

<Input type="text" placeholder="Search" iconBlock={<Icon/>} />

<Input
  type="select"
  value={gender}
  onChange={setGender}
  options={[
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]}
/>
*/
}

export default Input;
