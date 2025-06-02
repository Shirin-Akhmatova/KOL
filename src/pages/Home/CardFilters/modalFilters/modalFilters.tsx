import PriceFilterChart from "./priceFilterChart/priceFilterChart";
import type { IModalFilters } from "../cardFilters.interface";
import PopupWindow from "@/shared/ui/PopupWindow/popupWindow";
import { useState } from "react";
import styles from "./modalFilters.module.scss";
import globalStyles from "../cardFilters.module.scss";
import SelectedFilters from "./selectedFilters/selectedFilters";
import RecommendationFilters from "./recommendationFilters/recommendationFilters";
import MapFilter from "./mapFilter/mapFilter";
import useFilters from "@/shared/hooks/useFilters";

const ModalFiltersBtn = ({
  modalFilters,
}: {
  modalFilters: Omit<IModalFilters, "roomTypeFilters">;
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <>
      <button
        className={styles.modalFiltersBtn}
        onClick={() => setIsOpenModal((prev) => !prev)}
      >
        <img
          className={styles.modalFiltersBtnImg}
          src="/imgs/svgs/settings.svg"
          alt=""
        />
        Settings
      </button>
      {isOpenModal && (
        <ModalFilters
          setIsOpenModal={setIsOpenModal}
          modalFilters={modalFilters}
        />
      )}
    </>
  );
};

function ModalFiltersFooter({
  setIsOpenModal,
}: {
  setIsOpenModal: (isOpenModal: boolean) => void;
}) {
  const { clear } = useFilters();

  const clearFilters = () => {
    clear();
  };
  const showAllFilters = () => {
    setIsOpenModal(false);
  };
  return (
    <div className={styles.modalFiltersFooter}>
      <button
        className={styles.modalFiltersFooterBtnLine}
        onClick={clearFilters}
      >
        Очистить всё
      </button>
      <button className={styles.modalFiltersFooterBtn} onClick={showAllFilters}>
        Показать все 1000 вариантов
      </button>
    </div>
  );
}

function ModalFilters({
  modalFilters,
  setIsOpenModal,
}: {
  modalFilters: Omit<IModalFilters, "roomTypeFilters">;
  setIsOpenModal: (isOpenModal: boolean) => void;
}) {
  return (
    <PopupWindow
      headerTitle="Фильтры"
      closeCallback={setIsOpenModal}
      footerButtons={<ModalFiltersFooter setIsOpenModal={setIsOpenModal} />}
    >
      <PriceFilterChart
        title="Ценовой диапазон"
        subtitle="Стоимость поездки, включая все сборы"
        data={modalFilters.price}
        priceMin={0}
        priceMax={1000000}
      />
      <div className={globalStyles.hr}></div>
      <SelectedFilters
        data={modalFilters.facilities}
        filterName="facilities"
        title="Удобства"
      />
      <div className={globalStyles.hr}></div>
      <SelectedFilters
        data={modalFilters.booking}
        filterName="booking"
        title="Возможности бронирования"
      />
      <div className={globalStyles.hr}></div>
      <RecommendationFilters
        recommendation={modalFilters.recommendation}
        title="Отличное жилье"
      />
      <div className={globalStyles.hr}></div>
      <MapFilter title="Район" />
    </PopupWindow>
  );
}

export default ModalFiltersBtn;
