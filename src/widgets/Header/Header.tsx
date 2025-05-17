import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../assets/icons/KOL.svg";
import LangIcon from "../../assets/icons/globe 3.svg";
import Person from "../../assets/icons/person.svg";
import BurgerMenu from "../../assets/icons/Burger.svg";
import SearchIcon from "../../assets/icons/magnifyingglass 2.svg";
import SearchModal from "../SearchModal/SearchModal";
import UserProfileModal from "../UserProfileModel/UserProfileModal";
import Register from "../RegisterModal/RegisterModal";
// import Calendar from "../Calendar/Calendar";

function Header() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  const handleOpenModal = () => setIsModalOpen(true);
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsTitleVisible(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.withBackground : ""}`}
      >
        <div className={styles.container}>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>

          <h3
            className={`${styles.title} ${
              scrolled ? styles.titleScrolled : ""
            } ${!isTitleVisible ? styles.titleHidden : ""}`}
          >
            Живи у озера - дыши горами
          </h3>

          <div className={styles.mainContent}>
            <img src={LangIcon} alt="LangIcon" className={styles.langIcon} />
            <div className={styles.menu}>
              <img
                src={BurgerMenu}
                alt="BurgerMenu"
                className={styles.burgerIcon}
                onClick={() => setIsUserProfileModalOpen((prev) => !prev)}
              />
              <img
                src={Person}
                alt="Person"
                className={styles.personIcon}
                onClick={() => navigate("/loginUserProfilePage")}
              />
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

          <button className={styles.searchItem} onClick={toggleCalendar}>
            {!scrolled && <span className={styles.label}>Прибытие</span>}
            <span className={styles.placeholder}>
              {scrolled ? "Дата" : "Когда?"}
            </span>
          </button>

          {!scrolled && (
            <>
              <div className={styles.divider} />
              <button className={styles.searchItem} onClick={toggleCalendar}>
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
              <span className={styles.placeholder}>Кто едет?</span>
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

      {isUserProfileModalOpen && (
        <UserProfileModal
          onClose={() => setIsUserProfileModalOpen(false)}
          onRegisterClick={() => {
            setIsUserProfileModalOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} />}
      {isCalendarOpen && (
        <div
          style={{
            position: "absolute",
            top: "130px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            width: "446px",
            height: "415px",
          }}
        >
          {/* <Calendar /> */}
        </div>
      )}
    </>
  );
}

export default Header;
