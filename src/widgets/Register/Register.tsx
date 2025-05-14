import { useRef, useState } from "react";
import styles from "./Register.module.scss";
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

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const telInputRef = useRef<HTMLDivElement>(null);

  const isValid = phoneNumber.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    console.log(`Phone: ${phoneNumber}`);
  };

  const handleCountrySelect = (code: string, country: string) => {
    setCountryCode(code);
  };

  return (
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
          value={phoneNumber}
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, "");
            setPhoneNumber(onlyDigits);
          }}
          placeholder="Phone number"
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
  );
};

export default Register;
