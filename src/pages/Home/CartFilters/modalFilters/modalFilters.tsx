import styles from "./modalFilters.module.scss";

function ModalFilters() {
  return (
    <button className={styles.modalFiltersBtn}>
      <img className={styles.modalFiltersBtnImg} src="/imgs/svgs/settings.svg" alt="" />
      Settings
    </button>
  );
}

export default ModalFilters;
