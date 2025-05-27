import React, { useState } from "react";
import styles from "./RegisterModal.module.scss";
import googleIcon from "../../assets/icons/google.svg";
import appleIcon from "../../assets/icons/apple.svg";
import emailIcon from "../../assets/icons/email.svg";
import exitIcon from "../../assets/icons/exitIcon.svg";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomCountryCode from "../CustomCountryCode/CustomCountryCode";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SmsModal from "../SmsModal/SmsModal";



interface RegisterProps {
  onClose?: () => void;
}

// Форматируем номер как XXX XXX XXXX
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
  const [showModal, setShowModal] = useState(false);


  // Проверка валидности номера: для +996 — 9 цифр
  const isValid = phoneNumber.length === 9;

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!isValid) return;

  console.log(`Phone: ${countryCode} ${phoneNumber}`);
  
  toast.success("Номер успешно отправлен!");
    setShowModal(true);
};


  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setPhoneNumber(""); // сброс номера при смене страны
  };

  const displayValue = `${countryCode} ${formatPhoneNumber(phoneNumber)}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Убираем код страны из ввода, если он есть
    if (val.startsWith(countryCode)) {
      val = val.slice(countryCode.length).trim();
    }
    // Оставляем только цифры
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
            buttonColor={isValid ? "linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)" : "#ccc"}
            style={{ border: "none", cursor: isValid ? "pointer" : "not-allowed" }}
            disabled={!isValid}
          />
        </form>

        <div className={styles.register__divider}>Or connect using</div>

        <div className={styles.buttonsWrapper}>
          <CustomButton
            text="Continue with Google"
            icon={<img src={googleIcon} alt="google" />}
          />
          <CustomButton
            text="Continue with Apple"
            icon={<img src={appleIcon} alt="apple" />}
          />
          <CustomButton
            text="Continue with eMail"
            icon={<img src={emailIcon} alt="email" />}
          />
        </div>
      </div>
      {showModal && (
  <SmsModal
    onClose={() => setShowModal(false)}
    phoneNumber={`${countryCode} ${formatPhoneNumber(phoneNumber)}`}
  />
)}

    </div>
  );
};

export default Register;
