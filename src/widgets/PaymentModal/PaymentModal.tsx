import CustomButton from "../CustomButton/CustomButton";
import scss from "./PaymentModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Payment = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={scss.overlay} onClick={onClose}>
      <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={scss.title}>Payment methods</h1>
        <div className={scss.form}>
          <h4 className={scss.subtitle}>Your payments</h4>
          <p className={scss.description}>All your payment methods</p>
          <CustomButton
            text="Manage payments"
            buttonColor="linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
            textColor="#fff"
            style={{
              border: "none",
              width: "304px",
              height: "48px",
              marginBottom: "61px",
            }}
          />
          <h4 className={scss.subtitle}>Payment methods</h4>
          <p className={scss.description}>Add a payment method</p>
          <CustomButton
            text="Add payment methods"
            buttonColor="linear-gradient(90deg, #16BBB4, #50C9C4, #15B3AC)"
            textColor="#fff"
            style={{ border: "none", width: "378px", height: "48px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
