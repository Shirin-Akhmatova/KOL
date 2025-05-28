import { useState } from "react";
import styles from "./LoginSecurityModal.module.scss";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import googleIcon from "../../assets/icons/google.svg";
import appleIcon from "../../assets/icons/apple.svg";
import emailIcon from "../../assets/icons/email.svg";
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
        <h2 className={styles.title}>Login & Security</h2>

        <form className={styles.form}>
          <label>
            Change login
            <CustomInput
              label="Alex"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={{ height: "42px" }}
            />
          </label>

          <label>
            Change Password
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
            Social networks
            <div className={styles.socials}>
              <CustomButton
                text="Google"
                icon={<img src={googleIcon} />}
                iconRight={<img src={checkIcon} />}
                style={{ height: "40px" }}
              />
              <CustomButton
                text="Apple"
                icon={<img src={appleIcon} />}
                iconRight={<img src={checkIcon} />}
                style={{ height: "40px" }}
              />
              <CustomButton
                text="eMail"
                icon={<img src={emailIcon} />}
                style={{ height: "40px" }}
              />
            </div>
          </label>

          <div className={styles.account_settings}>
            <p>Account</p>
            <div className={styles.deactivate_account}>
              <p>Deactivate your account</p>
              <p className={styles.deactivate_btn} onClick={onClose}>
                Deactivate
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
