import scss from "./ChoosePay.module.scss";

const ChoosePay = () => {
  return (
    <div className={scss.ChoosePay}>
      <h1>Payment methods</h1>
      <div className={scss.content}>
        <div className={scss.card}>
          <h4>Your payments</h4>
          <p>All your payments methods</p>
          <button>Manage payments</button>
        </div>
        <div className={scss.card}>
          <h4>Payment methods</h4>
          <p>Add a payment method</p>
          <button>Add payment methods</button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePay;
