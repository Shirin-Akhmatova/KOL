import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./footer.module.scss";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";
import RegisterModal from "../RegisterModal/RegisterModal";

function Footer() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/create-service");
  };

  return (
    <div className={styles.footer}>
      <FooterTop onAuthClick={() => setIsRegisterModalOpen(true)} />
      <FooterBottom />
      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => setIsRegisterModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}

export default Footer;