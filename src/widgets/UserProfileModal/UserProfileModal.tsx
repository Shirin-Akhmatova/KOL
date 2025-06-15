import styles from "./UserProfileModal.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/services/redux/store";
import { useNavigate } from "react-router-dom";

type UserProfileModalProps = {
  onClose: () => void;
  onRegisterClick: () => void;
};

function UserProfileModal({ onClose, onRegisterClick }: UserProfileModalProps) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).className.includes(styles.userProfileModal_overlay)) {
      onClose();
    }
  };

  const handleCreateServiceClick = () => {
    if (isAuthenticated) {
      navigate('/create-service');
      onClose();
    } else {
      onRegisterClick();
    }
  };

  return (
    <div
      className={styles.userProfileModal_overlay}
      onClick={handleClickOutside}
    >
      <div className={styles.userProfileModal_container}>
        <ul>
          <li onClick={onRegisterClick}>Регистрация/Вход</li>
          <div className={styles.divider}></div>
          <li onClick={handleCreateServiceClick}>Сдать жилье на KÖL</li>
          <li>Центр помощи</li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfileModal;