import { useState } from "react";
import { usePhoneFormatter } from "../PersonalInfoModal/usePhoneFormatter";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./PersonalInfoModal.module.scss";
import checkIcon from "../../assets/icons/check.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalInfoModal({ isOpen, onClose }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("10");
  const [birthMonth, setBirthMonth] = useState("02");
  const [birthYear, setBirthYear] = useState("2010");
  const [gender, setGender] = useState("Мужской");

  const selectedCode = "+996";
  const formattedPhone = usePhoneFormatter(selectedCode, phone);

  const handleSave = () => {
    // Логика сохранения данных
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Личная информация</h2>

        <form className={styles.form}>
          <label>
            Имя
            <CustomInput
              label="Алексей"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ height: "44px" }}
            />
          </label>

          <label>
            Фамилия
            <CustomInput
              label="Иванов"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ height: "44px" }}
            />
          </label>

          <label>
            Номер телефона
            <CustomInput
              label="+996 000 000 000"
              type="text"
              value={formattedPhone}
              onChange={(e) => setPhone(e.target.value)}
              iconRight={<img src={checkIcon} alt="галочка" />}
              style={{ height: "44px" }}
            />
          </label>

          <label>
            Email
            <CustomInput
              label="supermail@gmail.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              iconRight={<img src={checkIcon} alt="галочка" />}
              style={{ height: "44px" }}
            />
          </label>

          <div className={styles.row}>
            <label>
              Дата рождения
              <div className={styles.birthDate}>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i}>{String(i + 1).padStart(2, "0")}</option>
                  ))}
                </select>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                >
                  {[
                    "01", "02", "03", "04", "05", "06",
                    "07", "08", "09", "10", "11", "12"
                  ].map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                >
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i}>{2025 - i}</option>
                  ))}
                </select>
              </div>
            </label>

            <label>
              Пол
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Выберите пол</option>
                <option>Мужской</option>
                <option>Женский</option>
                <option>Другой</option>
              </select>
            </label>
          </div>

          <div className={styles.saveButton}>
            <CustomButton
              text="Сохранить"
              onClick={handleSave}
              style={{ height: "48px", marginTop: "30px" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}