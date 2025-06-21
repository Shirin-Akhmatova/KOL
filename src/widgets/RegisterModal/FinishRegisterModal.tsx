import React, { useState, useEffect } from "react";
import styles from "./FinishRegisterModal.module.scss";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import exitIcon from "../../assets/icons/exitIcon.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "@/app/services/redux/hooks";
import { updateUserData } from "@/app/services/redux/Register/userSlice";

interface FinishRegisterProps {
  onClose?: () => void;
  phoneNumber?: string;
  user?: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string | null;
    birth_date?: string | null;
  };
}

const formatPhoneNumber = (num: string) => {
  const cleaned = num.replace(/\D/g, "");
  const part1 = cleaned.slice(0, 3);
  const part2 = cleaned.slice(3, 6);
  const part3 = cleaned.slice(6, 9);
  return [part1, part2, part3].filter(Boolean).join(" ");
};

const FinishRegisterModal: React.FC<FinishRegisterProps> = ({
  onClose,
  phoneNumber,
  user,
}) => {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rawNumber, setRawNumber] = useState(() => {
    if (!phoneNumber) return "";
    return phoneNumber.replace(/^\+996\s?/, "").replace(/\D/g, "");
  });
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const countryCode = "+996";

  useEffect(() => {
    if (phoneNumber) {
      setRawNumber(phoneNumber.replace(/^\+996\s?/, "").replace(/\D/g, ""));
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      if (user.phone_number) {
        setRawNumber(
          user.phone_number.replace(/^\+996\s?/, "").replace(/\D/g, "")
        );
      }
      if (user.birth_date) {
        const [year, month, day] = user.birth_date.split("-");
        setBirthDate({
          day: day || "",
          month: month || "",
          year: year || "",
        });
      }
    }
  }, [user]);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith(countryCode)) {
      val = val.slice(countryCode.length).trim();
    }
    setRawNumber(val.replace(/\D/g, ""));
  };

  const displayValue = `${countryCode} ${formatPhoneNumber(rawNumber)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim()) return toast.error("Пожалуйста введите свое имя");
    if (!lastName.trim()) return toast.error("Пожалуйста введите свою фамилию");
    if (!email.trim()) return toast.error("Пожалуйста введите email");
    if (rawNumber.length !== 9)
      return toast.error("Некорректный номер телефона");
    if (!birthDate.day || !birthDate.month || !birthDate.year)
      return toast.error("Укажите дату рождения");
    if (!agree) return toast.error("Вы должны согласиться с условиями");

    setLoading(true);

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone_number: `${countryCode}${rawNumber}`,
      birth_date: `${birthDate.year}-${birthDate.month}-${birthDate.day}`,
    };

    dispatch(updateUserData(payload))
      .unwrap()
      .then(() => {
        toast.success("Регистрация завершена!");
        setTimeout(() => {
          if (onClose) onClose();
        }, 1300);
      })
      .catch((errorMsg) => {
        toast.error(errorMsg || "Ошибка при обновлении данных");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.overlay}>
        <div className={styles.finishRegister}>
          <div className={styles.finishRegister__header}>
            <h4 className={styles.finishRegister__subtitle}>
              Finish registration
            </h4>
            <button className={styles.finishRegister__close} onClick={onClose}>
              <img src={exitIcon} alt="exit" />
            </button>
            <div className={styles.divider}></div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
              <div className={styles.legal_name_container}>
                <div className={styles.titles}>Legal name</div>
                <CustomInput
                  value={firstName}
                  label="First name"
                  placeholder="Your first name here..."
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ marginBottom: "20px" }}
                />
                <CustomInput
                  value={lastName}
                  label="Last name"
                  placeholder="Your last name here..."
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ marginBottom: "20px" }}
                />
              </div>

              <div className={styles.contact_info_container}>
                <div className={styles.titles}>Contact info</div>
                <CustomInput
                  value={email}
                  label="Email"
                  placeholder="Your email here..."
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "20px" }}
                />
                <CustomInput
                  value={displayValue}
                  label="Phone number"
                  placeholder={
                    rawNumber.length === 0 ? "Your number here..." : ""
                  }
                  onChange={handlePhoneInputChange}
                  style={{ marginBottom: "20px" }}
                />
              </div>

              <div className={styles.date_of_birth_container}>
                <div className={styles.titles}>Date of birth</div>
                <label>
                  <div className={styles.birthDate}>
                    <select
                      value={birthDate.day}
                      onChange={(e) =>
                        setBirthDate({ ...birthDate, day: e.target.value })
                      }
                      disabled={loading}
                    >
                      <option value="" disabled hidden>
                        Day
                      </option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, "0")}>
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>

                    <select
                      value={birthDate.month}
                      onChange={(e) =>
                        setBirthDate({ ...birthDate, month: e.target.value })
                      }
                      disabled={loading}
                    >
                      <option value="" disabled hidden>
                        Month
                      </option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = String(i + 1).padStart(2, "0");
                        return (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      value={birthDate.year}
                      onChange={(e) =>
                        setBirthDate({ ...birthDate, year: e.target.value })
                      }
                      disabled={loading}
                    >
                      <option value="" disabled hidden>
                        Year
                      </option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = 2025 - i;
                        return (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </label>
              </div>

              <CustomButton
                text="Agree and continue"
                textColor="#fff"
                buttonColor="linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
                style={{ border: "none", marginBottom: "30px" }}
                disabled={loading}
              />

              <div className={styles.checkbox_wrapper}>
                <input
                  id="agreement"
                  className={styles.checkbox}
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  disabled={loading}
                />
                <label
                  htmlFor="agreement"
                  style={{ marginLeft: "8px", cursor: "pointer" }}
                >
                  Agreements Agreements Agreements
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishRegisterModal;
