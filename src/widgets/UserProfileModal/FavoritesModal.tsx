import exitIcon from "../../assets/icons/exitIcon.svg";
import styles from './FavoritesModal.module.scss';

type FavoritesProps = {
    onClose: () => void
}

const FavoritesModal: React.FC<FavoritesProps> = ({ onClose }) => {
  return (
    <div className={styles.favoritesModal_overlay}>
        <div className={styles.favoritesModal}>
            <div className={styles.favoritesModal__header}>
                <h3 className={styles.favoritesModal__subtitle}>Избранное</h3>
                <button className={styles.favoritesModal__close} onClick={onClose}>
                    <img src={exitIcon} alt="Закрыть" />
                </button>
                    <div className={styles.divider}></div> 
            </div>
            <div className={styles.favoritesModal__content}>
                <h1 className={styles.favoritesModal__title}>
                    В разработке
                </h1>
            </div>
        </div>
    </div>
  )
}

export default FavoritesModal