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
  resetGoogleUser,
} from "../../app/services/redux/Register/signupWithGoogle";
import type { RootState, AppDispatch } from "../../app/services/redux/store";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterModal.module.scss";
import googleIcon from "../../assets/icons/google.svg";
import exitIcon from "../../assets/icons/exitIcon.svg";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomCountryCode from "../CustomCountryCode/CustomCountryCode";
import SmsModal from "../SmsModal/SmsModal";

import "react-toastify/dist/ReactToastify.css";
import { fetchUserData } from "@/app/services/redux/Register/googleLoginSlice";
import FinishRegisterModal from "./FinishRegisterModal";
import { resetUserState } from "@/app/services/redux/Register/userSlice";
import { resetVerifyState } from "@/app/services/redux/OTP/verifySlice";

interface RegisterProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const formatPhoneNumber = (num: string) => {
  const cleaned = num.replace(/\D/g, "");
  const part1 = cleaned.slice(0, 3);
  const part2 = cleaned.slice(3, 6);
  const part3 = cleaned.slice(6, 9);
  return [part1, part2, part3].filter(Boolean).join(" ");
};

const Register: React.FC<RegisterProps> = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  const { error: googleError, success: googleSuccess } = useSelector(
    (state: RootState) => state.googleLogin
  );

  const user = useSelector((state: RootState) => state.user.user);
  const googleUserRaw = useSelector(
    (state: RootState) => state.googleLogin.user
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.verify);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+996");
  const [showModal, setShowModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const isValid = phoneNumber.length === 9;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const redirectPath = localStorage.getItem("redirectAfterAuth");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterAuth");
        navigate(redirectPath);
        onClose?.();
        onSuccess?.();
      }
    }
  }, [navigate, onClose, onSuccess, user]);

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
      toast.success("Код подтверждения отправлен!");
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
    }
  }, [googleSuccess, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserData());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (googleSuccess && user && googleUserRaw !== "False") {
      setTimeout(() => {
        onClose?.();
        onSuccess?.();
      }, 1200);
    }
  }, [user, googleSuccess, googleUserRaw, onClose, onSuccess]);

  useEffect(() => {
    if (googleSuccess) {
      dispatch(fetchUserData());
    }
  }, [googleSuccess, dispatch]);

  useEffect(() => {
    const isUserEmpty =
      googleUserRaw === null ||
      googleUserRaw === false ||
      googleUserRaw === "False" ||
      (typeof googleUserRaw === "string" &&
        googleUserRaw.toLowerCase() === "false");

    if ((googleSuccess || isAuthenticated) && isUserEmpty) {
      setShowFinishModal(true);
    } else {
      setShowFinishModal(false);
    }
  }, [
    googleSuccess,
    googleError,
    googleUserRaw,
    isAuthenticated,
    dispatch,
    onClose,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetGoogleUser());
      dispatch(resetGoogleLoginState());
      dispatch(resetRegisterState());

      const token = localStorage.getItem("access_token");
      if (!token) {
        dispatch(resetUserState());
      }
    };
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.overlay}>
        <div className={styles.register}>
          <div className={styles.register__header}>
            <h4 className={styles.register__subtitle}>
              Log in or Registration
            </h4>
            <button className={styles.register__close} onClick={onClose}>
              <img src={exitIcon} alt="exit" />
            </button>
            <div className={styles.divider}></div>
            <h2 className={styles.register__title}>Welcome to KöL</h2>
          </div>

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

          <CustomButton
            text="Continue with Google"
            onClick={() => googleLogin()}
            textColor="#000"
            buttonColor="#fff"
            icon={<img src={googleIcon} />}
          />
        </div>

        {showModal && (
          <SmsModal
            onClose={() => {
              setShowModal(false);
              dispatch(resetVerifyState());
              onClose?.();
            }}
            phoneNumber={`${countryCode} ${formatPhoneNumber(phoneNumber)}`}
          />
        )}

        {showFinishModal && (
          <FinishRegisterModal
            onClose={() => {
              setShowFinishModal(false);
              dispatch(resetGoogleUser());
              onClose?.();
            }}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default Register;
