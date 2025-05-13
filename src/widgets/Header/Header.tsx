import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Logo from "../../assets/icons/KOL.svg";
import LangIcon from "../../assets/icons/globe 3.svg";
import Person from "../../assets/icons/person.svg";
import BurgerMenu from "../../assets/icons/Burger.svg";
import SearchIcon from "../../assets/icons/magnifyingglass 2.svg";
import SearchModal from "../SearchModal/SearchModal";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true); // открывает модалку поисковика

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.withBackground : ""}`}
      >
        <div className={styles.container}>
          <a href="#">
            <img src={Logo} alt="Logo" />
          </a>

          {!scrolled ? <h3>Живи у озера - дыши горами</h3> : null}

          <div className={styles.mainContent}>
            <img src={LangIcon} alt="LangIcon" />
            <div className={styles.menu}>
              <img src={BurgerMenu} alt="BurgerMenu" />
              <img src={Person} alt="Person" />
            </div>
          </div>
        </div>

        <div
          className={`${styles.searchBar} ${
            scrolled ? styles.searchBarScrolled : ""
          }`}
        >
          <button className={styles.searchItem}>
            {!scrolled && <span className={styles.label}>Где</span>}
            <span className={styles.placeholder}>
              {scrolled ? "Куда" : "Поиск направлений"}
            </span>
          </button>
          <div className={styles.divider} />
          <button className={styles.searchItem}>
            {!scrolled && <span className={styles.label}>Прибытие</span>}
            <span className={styles.placeholder}>
              {scrolled ? "Дата" : "Когда?"}
            </span>
          </button>
          {!scrolled && (
            <>
              <div className={styles.divider} />
              <button className={styles.searchItem}>
                <span className={styles.label}>Выезд</span>
                <span className={styles.placeholder}>Когда?</span>
              </button>
            </>
          )}
          <div className={styles.divider} />
          <div
            className={`${styles.searchBarEnd} ${
              scrolled ? styles.searchBarEndScrolled : ""
            }`}
          >
            <button
              type="button"
              className={styles.searchItem}
              onClick={handleOpenModal}
            >
              {!scrolled && <span className={styles.label}>Кто</span>}
              <span className={styles.placeholder}>
                {scrolled ? "Кто едет?" : "Кто едет?"}
              </span>
            </button>
            <button
              type="button"
              className={`${styles.searchButton} ${
                scrolled ? styles.searchButtonScrolled : ""
              }`}
              onClick={handleOpenModal}
            >
              <img src={SearchIcon} alt="SearchIcon" />
            </button>
          </div>
        </div>
      </header>

      {/* {isModalOpen && <SearchModal />} */}
    </>
  );
}

export default Header;
