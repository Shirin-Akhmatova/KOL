import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import {registerUser,resetRegisterState,} from "../../app/services/redux/Register/registerSlice";
import {loginWithGoogle,resetGoogleLoginState,} from "../../app/services/redux/Register/signupWithGoogle";
import type { RootState, AppDispatch } from "../../app/services/redux/store";
import styles from "./RegisterModal.module.scss";
import exitIcon from "../../assets/icons/exitIcon.svg";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomCountryCode from "../CustomCountryCode/CustomCountryCode";
import SmsModal from "../SmsModal/SmsModal";
import googleIcon from "../../assets/icons/google.svg";

import "react-toastify/dist/ReactToastify.css";
import { fetchUserData } from "@/app/services/redux/Register/googleLoginSlice";

interface RegisterProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );
  const { error: googleError, success: googleSuccess } = useSelector(
    (state: RootState) => state.googleLogin
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+996");
  const [showModal, setShowModal] = useState(false);

  const formatPhoneNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 6);
    const part3 = cleaned.slice(6, 10);
    return [part1, part2, part3].filter(Boolean).join(" ");
  };

  const isValid = phoneNumber.length === 9;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    const fullPhone = `${countryCode}${phoneNumber}`;
    dispatch(registerUser(fullPhone));
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setPhoneNumber("");
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

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (!accessToken) {
        toast.error("Не удалось получить access_token от Google");
        return;
      }
      dispatch(loginWithGoogle({ access_token: accessToken }));
    },
    onError: () => {
      toast.error("Ошибка входа через Google");
    },
  });

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
      dispatch(fetchUserData());
      setTimeout(() => {
        dispatch(resetGoogleLoginState());
        onClose?.();
        onSuccess?.();
      }, 1800);
    }
    if (googleError) {
      toast.error(googleError);
      dispatch(resetGoogleLoginState());
    }
  }, [googleSuccess, googleError, dispatch, onClose, onSuccess]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.overlay}>
        <div className={styles.register}>
          <header className={styles.register__header}>
            <h4 className={styles.register__subtitle}>
              Вход или регистрация
            </h4>
            <button className={styles.register__close} onClick={onClose}>
              <img src={exitIcon} alt="Закрыть" />
            </button>
            <div className={styles.divider}></div>
            <h2 className={styles.register__title}>Добро пожаловать в KöL</h2>
          </header>

          <form className={styles.register__form} onSubmit={handleSubmit}>
            <CustomCountryCode onSelect={handleCountrySelect} />

            <CustomInput
              value={displayValue}
              onChange={handleInputChange}
              placeholder={phoneNumber.length === 0 ? "Номер телефона" : ""}
              borderColor="#B0B0B0"
              type="tel"
            />

            <CustomButton
              text={loading ? "Отправка..." : "Продолжить"}
              textColor="#fff"
              buttonColor={
                isValid && !loading
                  ? "linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
                  : "#ccc"
              }
              disabled={!isValid || loading}
              style={{
                border: "none",
                cursor: isValid && !loading ? "pointer" : "not-allowed",
              }}
            />
          </form>

          <div className={styles.register__divider}>Или войдите с помощью</div>

          <CustomButton
            text="Продолжить с Google"
            onClick={googleLogin}
            textColor="#000"
            buttonColor="#fff"
            icon={<img src={googleIcon} alt="Google" />}
          />
        </div>

        {showModal && (
          <SmsModal
            onClose={() => setShowModal(false)}
            phoneNumber={`${countryCode} ${formatPhoneNumber(phoneNumber)}`}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </>
  );
};

export default Register;