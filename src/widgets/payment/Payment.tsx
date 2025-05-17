import check from "@/assets/icons/check.svg";
import VISA from "@/assets/icons/VISA.svg";
import scss from "./Payment.module.scss";

const Payment = () => {
  return (
    <div className={scss.Payment}>
      <h1>Your payments</h1>
      <div className={scss.content}>
        <h4>Select payment method</h4>
        <div className={scss.card}>
          <img className={scss.check} src={check} alt="check" />
          <div className={scss.visa}>
            <img src={VISA} alt="VISA" />
          </div>
          <div className={scss.cardInfo}>
            <span className={scss.cardNumber}>Card number:</span>
            <span>Expiration date:</span>
          </div>
          <div className={scss.cardInfo}>
            <span className={scss.cardNumber}>**** **** **** 1234</span>
            <span>12 / 2028</span>
          </div>
        </div>
        <div className={scss.card}>
          <img className={scss.check} src={check} alt="check" />
          <div className={scss.visa}>
            <img src={VISA} alt="VISA" />
          </div>
          <div className={scss.cardInfo}>
            <span className={scss.cardNumber}>Card number:</span>
            <span>Expiration date:</span>
          </div>
          <div className={scss.cardInfo}>
            <span className={scss.cardNumber}>**** **** **** 1234</span>
            <span>12 / 2028</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
