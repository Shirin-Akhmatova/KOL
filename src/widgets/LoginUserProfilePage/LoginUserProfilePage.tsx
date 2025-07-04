import { useState } from "react";
import styles from "./LoginUserProfilePage.module.scss";
import cameraIcon from "../../assets/icons/Map Chips.svg";
import UploadModal from "../UploadModal/UploadModal";
import PersonalInfoModal from "../PersonalInfoModal/PersonalInfoModal";
import LoginSecurityModal from "../LoginSecurityModal/LoginSecurityModal";
import NotificationsModal from "../NotificationsModal/NotificationsModal";
import Payment from "../PaymentModal/PaymentModal";
import ObjectsModal from "../ObjectsModal/ObjectsModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/services/redux/store";
import crossIcon from '../../assets/icons/cross.svg';
import markIcon from '../../assets/icons/checkMark.svg';
import logoutIcon from '../../assets/icons/out.svg';

function LoginUserProfilePage() {
  const [image, setImage] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isLoginSecurityModalOpen, setIsLoginSecurityModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isObjectsModalOpen, setIsObjectsModalOpen] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handleAvatarClick = () => {
    if (image) {
      setIsPreviewOpen(true);
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleSectionClick = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
  };

  const handleExit = () => {
    setShowExitConfirmation(true);
  };

  return (
    <div className={styles.loginUserProfilePage_container}>
      <div className={styles.loginUserProfilePage_wrapper}>
        <div
          className={styles.loginUserProfilePage_circleAvatar}
          onClick={handleAvatarClick}
        >
          {image ? (
            <img src={image} alt="аватар" className={styles.avatarImage} />
          ) : (
            <span>{user?.first_name?.[0] || "Г"}</span>
          )}

          <div className={styles.avatarOverlay}>
            <div
              className={styles.cameraIconWrapper}
              onClick={(e) => {
                e.stopPropagation();
                setIsUploadModalOpen(true);
              }}
            >
              <img src={cameraIcon} alt="Изменить аватар" />
            </div>
          </div>
        </div>

        <div className={styles.loginUserProfilePage_info}>
          <h1>{"Гость"}</h1>
          <p>{user?.email || "Нет email"}</p>
          <p>В KÖL уже</p>
          <h3>3 года</h3>
        </div>
      </div>

      <div className={styles.loginUserProfilePage_personalInfo}>
        <div className={styles.loginUserProfilePage_fixedInfo}>
          <h6>Информация о Гость</h6>
          <div className={styles.loginUserProfilePage_emailAndNumber}>
            <img src={crossIcon} alt="Не проверено" className={styles.crossIcon} />
            <p className={styles.emailText}>Адрес электронной почты</p>
          </div>
          <div className={styles.loginUserProfilePage_emailAndNumber}>
            <img src={markIcon} alt="Проверено" className={styles.markIcon} />
            <p>Номер телефона</p>
          </div>
        </div>

        <div className={styles.loginUserProfilePage_divider}></div>

        <div className={styles.loginUserProfilePage_settings}>
          <h6 onClick={() => handleSectionClick(setIsPersonalInfoModalOpen)}>
            <span>Персональная информация</span>
          </h6>

          <h6 onClick={() => handleSectionClick(setIsLoginSecurityModalOpen)}>
            <span>Безопасность и вход</span>
          </h6>

          <h6 onClick={() => handleSectionClick(setIsNotificationsModalOpen)}>
            <span>Уведомления</span>
          </h6>

          <h6 onClick={() => handleSectionClick(setIsPaymentModalOpen)}>
            <span>Способы оплаты</span>
          </h6>

          <h6 onClick={() => handleSectionClick(setIsObjectsModalOpen)}>
            <span>Мои объекты</span>
          </h6>

          <h6 onClick={handleExit} className={styles.logoutButton}>
            <img src={logoutIcon} alt="Выход" className={styles.logoutIcon} />
            <span>Выйти из аккаунта</span>
          </h6>
        </div>
      </div>

      {/* Модальное окно загрузки */}
      {isUploadModalOpen && (
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={(uploadedImage) => {
            setImage(uploadedImage);
            setIsUploadModalOpen(false);
          }}
        />
      )}

      {/* Модальное окно предпросмотра */}
      {isPreviewOpen && image && (
        <div className={styles.previewOverlay} onClick={() => setIsPreviewOpen(false)}>
          <div className={styles.previewModal}>
            <img src={image} alt="Предпросмотр аватара" />
          </div>
        </div>
      )}

      {/* Модальные окна разделов */}
      <PersonalInfoModal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setIsPersonalInfoModalOpen(false)}
      />

      <LoginSecurityModal
        isOpen={isLoginSecurityModalOpen}
        onClose={() => setIsLoginSecurityModalOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      <Payment
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <ObjectsModal
        isOpen={isObjectsModalOpen}
        onClose={() => setIsObjectsModalOpen(false)}
      />

      {/* Модальное окно подтверждения выхода */}
      {showExitConfirmation && (
        <div className={styles.confirmationOverlay} onClick={() => setShowExitConfirmation(false)}>
          <div className={styles.confirmationModal} onClick={(e) => e.stopPropagation()}>
            <h3>Подтверждение выхода</h3>
            <p>Вы уверены, что хотите выйти?</p>
            <div className={styles.confirmationButtons}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowExitConfirmation(false)}
              >
                Отмена
              </button>
              <button 
                className={styles.confirmButton}
                onClick={() => {
                  setShowExitConfirmation(false);
                  // Здесь должна быть логика выхода <3
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginUserProfilePage;