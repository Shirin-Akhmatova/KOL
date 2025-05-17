import { useState } from "react";
import styles from "./RegisterModal.module.scss";
import googleIcon from "../../assets/icons/google.svg";
import appleIcon from "../../assets/icons/apple.svg";
import emailIcon from "../../assets/icons/email.svg";
import exitIcon from "../../assets/icons/exitIcon.svg";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomCountryCode from "../CustomCountryCode/CustomCountryCode";

interface RegisterProps {
  onClose?: () => void;
}

const formatPhoneNumber = (num: string) => {
  const cleaned = num.replace(/\D/g, "");
  const part1 = cleaned.slice(0, 3);
  const part2 = cleaned.slice(3, 6);
  const part3 = cleaned.slice(6, 10);
  return [part1, part2, part3].filter(Boolean).join(" ");
};

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+996");

  const isValid = phoneNumber.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    console.log(`Phone: ${countryCode} ${phoneNumber}`);
  };

  const handleCountrySelect = (code: string, country: string) => {
    setCountryCode(code);
    setPhoneNumber("");
  };

  const displayValue = phoneNumber
    ? `${countryCode} ${formatPhoneNumber(phoneNumber)}`
    : "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (val.startsWith(countryCode)) {
      val = val.slice(countryCode.length).trim();
    }
    val = val.replace(/\D/g, "");

    setPhoneNumber(val);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.register}>
        <header className={styles.register__header}>
          <h4 className={styles.register__subtitle}>Log in or Registration</h4>
          <button className={styles.register__close} onClick={onClose}>
            <img src={exitIcon} alt="exit" />
          </button>
          <div className={styles.divider}></div>
          <h2 className={styles.register__title}>Welcome to KöL</h2>
        </header>

        <form className={styles.register__form} onSubmit={handleSubmit}>
          <CustomCountryCode onSelect={handleCountrySelect} />

          <CustomInput
            value={displayValue}
            onChange={handleInputChange}
            placeholder={phoneNumber.length === 0 ? "Phone number" : ""}
            borderColor="#B0B0B0"
            type="tel"
          />

          <CustomButton
            text="Continue"
            textColor="#fff"
            buttonColor="linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
            style={{ border: "none" }}
          />
        </form>

        <div className={styles.register__divider}>Or connect using</div>

        <div className={styles.buttonsWrapper}>
          <CustomButton
            text="Continue with Google"
            icon={<img src={googleIcon} />}
          />
          <CustomButton
            text="Continue with Apple"
            icon={<img src={appleIcon} />}
          />
          <CustomButton
            text="Continue with eMail"
            icon={<img src={emailIcon} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
