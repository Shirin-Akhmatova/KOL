import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  registerUser,
  resetRegisterState,
} from "../../app/services/redux/Register/registerSlice";
import {
  loginWithGoogle,
  resetGoogleLoginState,
} from "../../app/services/redux/Register/signupWithGoogle";
import type { RootState, AppDispatch } from "../../app/services/redux/store";
import { auth, provider } from "../../shared/ui/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import styles from "./RegisterModal.module.scss";
import googleIcon from "../../assets/icons/google.svg";
import exitIcon from "../../assets/icons/exitIcon.svg";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomCountryCode from "../CustomCountryCode/CustomCountryCode";
import SmsModal from "../SmsModal/SmsModal";

import "react-toastify/dist/ReactToastify.css";

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
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  const {
    loading: googleLoading,
    error: googleError,
    success: googleSuccess,
  } = useSelector((state: RootState) => state.googleLogin);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+996");
  const [showModal, setShowModal] = useState(false);

  // Проверка валидности номера: для +996 — 9 цифр
  const isValid = phoneNumber.length === 9;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    const fullPhone = `${countryCode}${phoneNumber}`;
    dispatch(registerUser(fullPhone));
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setPhoneNumber(""); // сброс номера при смене страны
  };

  const displayValue = `${countryCode} ${formatPhoneNumber(phoneNumber)}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith(countryCode)) {
      val = val.slice(countryCode.length).trim();
    }
    val = val.replace(/\D/g, "");
    setPhoneNumber(val);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const idToken = credential?.idToken;

      if (!idToken) {
        throw new Error("Не удалось получить id token от Google");
      }

      dispatch(loginWithGoogle({ access_token: idToken }));
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Ошибка при входе через Google");
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Номер успешно отправлен!");
      setShowModal(true);
      dispatch(resetRegisterState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetRegisterState());
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    if (googleSuccess) {
      toast.success("Успешный вход через Google!");
      dispatch(resetGoogleLoginState());
      onClose?.();
    }
    if (googleError) {
      toast.error(googleError);
      dispatch(resetGoogleLoginState());
    }
  }, [googleSuccess, googleError, dispatch, onClose]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.overlay}>
        <div className={styles.register}>
          <header className={styles.register__header}>
            <h4 className={styles.register__subtitle}>
              Log in or Registration
            </h4>
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
              text={loading ? "Loading..." : "Continue"}
              textColor="#fff"
              buttonColor={
                isValid && !loading
                  ? "linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
                  : "#ccc"
              }
              style={{
                border: "none",
                cursor: isValid && !loading ? "pointer" : "not-allowed",
              }}
              disabled={!isValid || loading}
            />
          </form>

          <div className={styles.register__divider}>Or connect using</div>

          <div className={styles.buttonsWrapper}>
            <CustomButton
              text={googleLoading ? "Loading..." : "Continue with Google"}
              icon={<img src={googleIcon} alt="google" />}
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
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
    </>
  );
};

export default Register;
