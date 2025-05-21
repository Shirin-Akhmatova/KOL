import { useState } from "react";
import { usePhoneFormatter } from "../PersonalInfoModal/usePhoneFormatter";
import CustomInput from "../CustomInput/CustomInput";
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
  const [gender, setGender] = useState("Male");

  const selectedCode = "+996";
  const formattedPhone = usePhoneFormatter(selectedCode, phone);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Personal information</h2>

        <form className={styles.form}>
          <label>
            First name
            <CustomInput
              label="Alex"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ height: "44px" }}
            />
          </label>

          <label>
            Last name
            <CustomInput
              label="Ivanov"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ height: "44px" }}
            />
          </label>

          <label>
            Phone number
            <CustomInput
              label="+996 000 000 000"
              type="text"
              value={formattedPhone}
              onChange={(e) => setPhone(e.target.value)}
              iconRight={<img src={checkIcon} alt="checkIcon" />}
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
              iconRight={<img src={checkIcon} alt="checkIcon" />}
              style={{ height: "44px" }}
            />
          </label>

          <div className={styles.row}>
            <label>
              Select your birth date
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
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
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
              Select gender
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
