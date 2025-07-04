import CustomButton from "../CustomButton/CustomButton";
import scss from "./PaymentModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={scss.overlay} onClick={onClose}>
      <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={scss.title}>Способы оплаты</h1>
        <div className={scss.form}>
          <h4 className={scss.subtitle}>Ваши платежи</h4>
          <p className={scss.description}>Все ваши способы оплаты</p>
          <CustomButton
            text="Управление платежами"
            buttonColor="linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
            textColor="#fff"
            style={{
              border: "none",
              width: "304px",
              height: "40px",
              marginBottom: "61px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          />
          <h4 className={scss.subtitle}>Платежные методы</h4>
          <p className={scss.description}>Добавить способ оплаты</p>
          <CustomButton
            text="Добавить способ оплаты"
            buttonColor="linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
            textColor="#fff"
            style={{ 
              border: "none", 
              width: "378px", 
              height: "40px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;