import { useState } from "react";
import styles from "./LoginSecurityModal.module.scss";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import googleIcon from "../../assets/icons/google.svg";
import checkIcon from "../../assets/icons/check.svg";
import eyeIcon from "../../assets/icons/toggleEyeIcon.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginSecurityModal({ isOpen, onClose }: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Безопасность и вход</h2>

        <form className={styles.form}>
          <label>
            Изменить логин
            <CustomInput
              label="Alex"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={{ height: "42px" }}
            />
          </label>

          <label>
            Изменить пароль
            <CustomInput
              label="..........."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRight={<img src={eyeIcon} />}
              style={{ height: "42px" }}
            />
          </label>

          <label style={{ marginTop: "42px" }}>
            Социальные сети
            <div className={styles.socials}>
              <CustomButton
                text="Google"
                icon={<img src={googleIcon} />}
                iconRight={<img src={checkIcon} />}
                style={{ height: "40px" }}
              />
            </div>
          </label>

          <div className={styles.account_settings}>
            <p>Аккаунт</p>
            <div className={styles.deactivate_account}>
              <p>Деактивировать ваш аккаунт</p>
              <p className={styles.deactivate_btn} onClick={onClose}>
                Деактивировать
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}