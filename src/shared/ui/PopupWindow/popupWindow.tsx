import { useEffect, type HTMLAttributes } from "react";
import styles from "./popupWindow.module.scss";

interface PopupWindowProps extends HTMLAttributes<HTMLDivElement> {
  headerTitle: string;
  closeCallback: (bool: boolean) => void;
  footerButtons: React.ReactNode;
}

function PopupWindow({
  headerTitle,
  closeCallback,
  footerButtons,
  children,
  ...props
}: PopupWindowProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupWindow} {...props}>
        <div className={styles.popupWindowHeader}>
          <h3>{headerTitle}</h3>
          <button
            className={styles.popupWindowHeaderClose}
            onClick={() => closeCallback(false)}
          >
            <img src="/imgs/svgs/close.svg" alt="close" />
          </button>
        </div>
        <div className={styles.popupWindowBody}>{children}</div>
        <div className={styles.popupWindowFooter}>{footerButtons}</div>
      </div>
    </div>
  );
}

export default PopupWindow;
