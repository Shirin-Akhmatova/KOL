import scss from "./ConfirmModal.module.scss";

const ConfirmModal = () => {
  return (
    <div className={scss.Confirm}>
      <div className="container">
        <div className={scss.content}>
          <h1>Подтверждение прибытия</h1>
          <div className={scss.live}></div>
          <h2>Информация</h2>
          <div className={scss.info}>
            <h1>Карван Four Seasons</h1>
            <div>
              <span>Цена:</span>
              <h4>340$</h4>
            </div>
            <div>
              <span>Дата:</span>
              <h4>15.03.2025 - 25.03.2025</h4>
            </div>
            <div>
              <span>Имя арендатора:</span>
              <h4>Арсен</h4>
            </div>
            <div>
              <span>Имя гостя:</span>
              <h4>Адахан</h4>
            </div>
          </div>
          <h2>Ваш отзыв</h2>
          <p>Будем благодарны за ваш отзыв</p>
          <div className={scss.buttons}>
            <button className={scss.later}>Напомнить позже </button>
            <button className={scss.confirm}>Подтверждаю </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
