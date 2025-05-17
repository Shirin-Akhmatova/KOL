import styles from "./UserProfileModal.module.scss";

function UserProfileModal({ onClose, onRegisterClick }) {
  const handleClickOutside = (e) => {
    if (e.target.className.includes(styles.userProfileModal_overlay)) {
      onClose();
    }
  };

  return (
    <div
      className={styles.userProfileModal_overlay}
      onClick={handleClickOutside}
    >
      <div className={styles.userProfileModal_container}>
        <ul>
          <li onClick={onRegisterClick}>Зарегистрироваться</li>
          <li>Войти</li>
          <div className={styles.divider}></div>
          <li>Сдать жилье на KÖL</li>
          <li>Центр помощи</li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfileModal;
