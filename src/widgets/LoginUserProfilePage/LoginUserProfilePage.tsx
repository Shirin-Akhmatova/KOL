import { useState } from "react";
import styles from "./LoginUserProfilePage.module.scss";
import markIcon from "../../assets/icons/check.svg";
import cameraIcon from "../../assets/icons/Map Chips.svg";
import UploadModal from "../UploadModal/UploadModal";
import PersonalInfoModal from "../PersonalInfoModal/PersonalInfoModal";
import LoginSecurityModal from "../LoginSecurityModal/LoginSecurityModal";
import NotificationsModal from "../NotificationsModal/NotificationsModal";
import Payment from "../PaymentModal/PaymentModal";
import ObjectsModal from "../ObjectsModal/ObjectsModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/services/redux/store";

function LoginUserProfilePage() {
  const [image, setImage] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isLoginSecurityModalOpen, setIsLoginSecurityModalOpen] =
    useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isObjectsModalOpen, setIsObjectsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handleAvatarClick = () => {
    if (image) {
      setIsPreviewOpen(true);
    } else {
      setIsUploadModalOpen(true);
    }
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
            <span>А</span>
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
          <h1>{user?.first_name || "Гость"}</h1>
          <p>{user?.email || "Нет email"}</p>
          <p>В KÖL уже</p>
          <h3>3 года</h3>
        </div>
      </div>

      <div className={styles.loginUserProfilePage_personalInfo}>
        <div className={styles.loginUserProfilePage_fixedInfo}>
          <h6>Подтвержденная информация {user?.first_name || "Алекса"}</h6>
          <div className={styles.loginUserProfilePage_emailAndNumber}>
            <img src={markIcon} alt="иконка отметки" />
            <p>Адрес электронной почты</p>
          </div>
          <div className={styles.loginUserProfilePage_emailAndNumber}>
            <img src={markIcon} alt="иконка отметки" />
            <p>Номер телефона</p>
          </div>
        </div>

        <div className={styles.loginUserProfilePage_divider}></div>

        <div className={styles.loginUserProfilePage_settings}>
          <h6
            onClick={() => setIsPersonalInfoModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Личная информация
          </h6>

          <h6
            onClick={() => setIsLoginSecurityModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Вход и безопасность
          </h6>
          <h6
            onClick={() => setIsNotificationsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Уведомления
          </h6>
          <h6
            onClick={() => setIsPaymentModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Методы оплаты
          </h6>
          <h6
            onClick={() => setIsObjectsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Список объектов
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
        <div
          className={styles.previewOverlay}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className={styles.previewModal}>
            <img src={image} />
          </div>
        </div>
      )}

      {/* Модальное окно личной информации */}
      <PersonalInfoModal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setIsPersonalInfoModalOpen(false)}
      />

      {/* Модальное окно входа и безопасности */}
      <LoginSecurityModal
        isOpen={isLoginSecurityModalOpen}
        onClose={() => setIsLoginSecurityModalOpen(false)}
      />

      {/* Модальное окно уведомлений */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      {/* Модальное окно оплаты */}
      <Payment
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      {/* Модальное окно объектов */}
      <ObjectsModal
        isOpen={isObjectsModalOpen}
        onClose={() => setIsObjectsModalOpen(false)}
      />
    </div>
  );
}

export default LoginUserProfilePage;
