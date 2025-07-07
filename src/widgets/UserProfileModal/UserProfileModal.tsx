import styles from "./UserProfileModal.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/services/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

type UserProfileModalProps = {
  onClose: () => void;
  onRegisterClick: () => void;
};

function UserProfileModal({ onClose, onRegisterClick }: UserProfileModalProps) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) =>
      state.auth.isAuthenticated || !!localStorage.getItem("access_token")
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateServiceClick = () => {
    if (isAuthenticated) {
      navigate("/create-service");
      onClose();
    } else {
      localStorage.setItem("redirectAfterAuth", "/create-service");
      onRegisterClick();
    }
  };

  return (
    <div className={styles.userProfileModal_overlay} ref={modalRef}>
      <div className={styles.userProfileModal_container}>
        <ul>
          <button
            onClick={onRegisterClick}
            disabled={isAuthenticated}
            className={styles.userProfileModal_button}
          >
            Регистрация/Вход
          </button>
          <div className={styles.divider}></div>
          <li onClick={handleCreateServiceClick}>Сдать жилье на KÖL</li>
          <li>Центр помощи</li>
          <li>
            <Link to="/favorites" onClick={onClose}>
              Избранное
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfileModal;
