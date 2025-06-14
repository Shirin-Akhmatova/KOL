import { useState } from "react";
import styles from "./footer.module.scss";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";
import RegisterModal from "../RegisterModal/RegisterModal";

function Footer() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className={styles.footer}>
      <FooterTop onAuthClick={() => setIsRegisterModalOpen(true)} />
      <FooterBottom />
      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </div>
  );
}

export default Footer;