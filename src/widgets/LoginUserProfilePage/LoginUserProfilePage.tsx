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
            <img src={image} alt="avatar" className={styles.avatarImage} />
          ) : (
            <span>A</span>
          )}

          <div className={styles.avatarOverlay}>
            <div
              className={styles.cameraIconWrapper}
              onClick={(e) => {
                e.stopPropagation();
                setIsUploadModalOpen(true);
              }}
            >
              <img src={cameraIcon} alt="Change avatar" />
            </div>
          </div>
        </div>

        <div className={styles.loginUserProfilePage_info}>
          <h1>Alex</h1>
          <p>Guest</p>
          <p>Years on KÖL</p>
          <h3>3</h3>
        </div>
      </div>

      <div className={styles.loginUserProfilePage_personalInfo}>
        <div className={styles.loginUserProfilePage_fixedInfo}>
          <h6>Alex’s confirmed information</h6>
          <div className={styles.loginUserProfilePage_emailAndNumber}>
            <img src={markIcon} alt="markIcon" />
            <p>Email address</p>
          </div>
          <div className={styles.loginUserProfilePage_emailAndNumber}>
            <img src={markIcon} alt="markIcon" />
            <p>Phone number</p>
          </div>
        </div>

        <div className={styles.loginUserProfilePage_divider}></div>

        <div className={styles.loginUserProfilePage_settings}>
          <h6
            onClick={() => setIsPersonalInfoModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Personal information
          </h6>

          <h6
            onClick={() => setIsLoginSecurityModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Login & Security
          </h6>
          <h6
            onClick={() => setIsNotificationsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Notifications
          </h6>
          <h6
            onClick={() => setIsPaymentModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Payment methods
          </h6>
          <h6
            onClick={() => setIsObjectsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Object’s list
          </h6>
        </div>
      </div>

      {/* Upload Modal */}
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

      {/* Preview Modal */}
      {isPreviewOpen && image && (
        <div
          className={styles.previewOverlay}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className={styles.previewModal}>
            <img src={image} alt="avatar preview" />
          </div>
        </div>
      )}

      {/* Personal Info Modal */}
      <PersonalInfoModal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setIsPersonalInfoModalOpen(false)}
      />

      {/* Login & Security Modal */}
      <LoginSecurityModal
        isOpen={isLoginSecurityModalOpen}
        onClose={() => setIsLoginSecurityModalOpen(false)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      {/* Payment Modal */}
      <Payment
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      {/* Objects Modal */}
      <ObjectsModal
        isOpen={isObjectsModalOpen}
        onClose={() => setIsObjectsModalOpen(false)}
      />
    </div>
  );
}

export default LoginUserProfilePage;
