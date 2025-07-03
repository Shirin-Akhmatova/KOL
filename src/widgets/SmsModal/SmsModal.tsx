import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./SmsModal.module.scss";
import SmsCodeInput from "../SmsCodeInput/SmsCodeInput";
import { useAppDispatch, useAppSelector } from "../../app/services/redux/hooks";
import {
  verifyCode,
  resetVerifyState,
} from "../../app/services/redux/OTP/verifySlice";
import smsBackIcon from "../../assets/icons/Cross (1).svg";
import FinishRegisterModal from "../RegisterModal/FinishRegisterModal";

interface SmsModalProps {
  onClose: () => void;
  phoneNumber: string;
}

const SmsModal: React.FC<SmsModalProps> = ({ onClose, phoneNumber }) => {
  const dispatch = useAppDispatch();
  const normalizedPhoneNumber = phoneNumber.replace("+", "");

  const [values, setValues] = useState(Array(4).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { loading, error, success, user } = useAppSelector(
    (state) => state.verify
  );
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {
    if (!phoneNumber) return;
    dispatch(resetVerifyState());
    setValues(Array(4).fill(""));
  }, [phoneNumber, dispatch]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    if (!canResend) return;
    setValues(Array(4).fill(""));
    setTimer(60);
    setCanResend(false);
    dispatch(resetVerifyState());
    console.log("Resending code to", normalizedPhoneNumber);
  };

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    if (val && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((digit) => digit.length === 1)) {
      const fullCode = newValues.join("");
      dispatch(
        verifyCode({
          phone_number: normalizedPhoneNumber,
          code: fullCode,
        })
      );
    }
  };

  const handleBackspace = (index: number) => {
    if (values[index] === "") {
      if (index > 0) inputsRef.current[index - 1]?.focus();
    } else {
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Неверный код подтверждения");
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const userExists =
        user &&
        user !== "False" &&
        !(typeof user === "string" && user.toLowerCase() === "false");

      if (userExists) {
        toast.info("Пользователь уже существует");
        const timeout = setTimeout(() => {
          onClose?.();
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        setShowFinishModal(true);
      }
    }
  }, [success, user, onClose]);

  return (
    <>
      {showFinishModal ? (
        <FinishRegisterModal
          user={user as any}
          onClose={() => {
            setShowFinishModal(false);
            onClose();
          }}
        />
      ) : (
        <div className={styles.smsModalOverlay} onClick={onClose}>
          <div className={styles.smsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button
                className={styles.backButton}
                onClick={onClose}
                disabled={loading}
              >
                <img src={smsBackIcon} />
              </button>
              <h2 className={styles.modalTitle}>Confirm your number</h2>
            </div>
            <p className={styles.modalSubtitle}>
              Enter the code we sent over SMS to +
              <strong>{normalizedPhoneNumber}</strong>
            </p>

            <div
              className={`${styles.codeInputs} ${error ? styles.error : ""}`}
            >
              {values.map((value, i) => (
                <SmsCodeInput
                  key={i}
                  value={value}
                  onChange={(val) => handleChange(i, val)}
                  onBackspace={() => handleBackspace(i)}
                  inputRef={(el) => (inputsRef.current[i] = el)}
                  disabled={loading}
                />
              ))}
            </div>

            <div className={styles.timer}>
              {canResend
                ? "You can request a new code"
                : `00:${timer.toString().padStart(2, "0")}`}
            </div>

            <div
              className={`${styles.resendCode} ${
                canResend ? styles.active : styles.disabled
              }`}
              onClick={handleResendCode}
            >
              Didn’t receive it?
              <span className={styles.resendText}>Resend code</span>
            </div>

            <button
              className={styles.continueBtn}
              disabled={loading}
              onClick={() => {
                if (values.some((v) => v.length !== 1)) {
                  toast.error("Пожалуйста, введите полный код из 4 цифр");
                  return;
                }
                const fullCode = values.join("");
                dispatch(
                  verifyCode({
                    phone_number: normalizedPhoneNumber,
                    code: fullCode,
                  })
                );
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SmsModal;
