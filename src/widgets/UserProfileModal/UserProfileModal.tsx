import styles from "./UserProfileModal.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/services/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
// import FavoritesModal from "./FavoritesModal";

type UserProfileModalProps = {
  onClose: () => void;
  onRegisterClick: () => void;
};

function UserProfileModal({ onClose, onRegisterClick }: UserProfileModalProps) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // закрывает модалку при клике вне блока бургера
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
      onRegisterClick();
    }
  };

  return (
    <div className={styles.userProfileModal_overlay} ref={modalRef}>
      <div className={styles.userProfileModal_container}>
        <ul>
          <li onClick={onRegisterClick}>Регистрация/Вход</li>
          <div className={styles.divider}></div>
          <li onClick={handleCreateServiceClick}>Сдать жилье на KÖL</li>
          <li>Центр помощи</li>
          <li>
            <Link to={"/favorites"}>Избранное</Link>
          </li>
        </ul>
      </div>
      {/* {showModal && <FavoritesModal onClose={() => setShowModal(false)} />} */}
    </div>
  );
}

export default UserProfileModal;
