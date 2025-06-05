import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { destinations } from "../../widgets/SearchModal/destinationsData";

import Logo from "../../assets/icons/KOL.svg";
import LangIcon from "../../assets/icons/globe 3.svg";
import Person from "../../assets/icons/person.svg";
import BurgerMenu from "../../assets/icons/Burger.svg";
import SearchIcon from "../../assets/icons/magnifyingglass 2.svg";

import SearchModal from "../SearchModal/SearchModal";
import UserProfileModal from "../UserProfileModal/UserProfileModal";
import Register from "../RegisterModal/RegisterModal";
import Calendar from "../Calendar/Calendar";
import TravelersModal from "../SearchModal/TravelersModal";

type Destination = {
  name: string;
  description?: string;
  icon?: string;
};

function Header() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] =
    useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isTitleVisible, setIsTitleVisible] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isTravelersModalOpen, setIsTravelersModalOpen] =
    useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const searchModalRef = useRef<HTMLDivElement>(null);
  const travelersModalRef = useRef<HTMLDivElement>(null);

  const filteredDestinations = destinations.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (destination: Destination) => {
    console.log("Выбрали:", destination);
    setSearchValue(destination.name);
    setIsModalOpen(false);
    setIsCalendarOpen(true);
  };

  const openTravelersModal = () => {
    setIsTravelersModalOpen(true);
    setIsSearchActive(true);
  };

  const openSearchModal = () => {
    setIsModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsModalOpen(false);
    setIsSearchActive(false);
  };

  const closeTravelersModal = () => {
    setIsTravelersModalOpen(false);
    setIsSearchActive(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsTitleVisible(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isModalOpen &&
        searchModalRef.current &&
        !searchModalRef.current.contains(target)
      ) {
        closeSearchModal();
      }

      if (
        isTravelersModalOpen &&
        travelersModalRef.current &&
        !travelersModalRef.current.contains(target)
      ) {
        closeTravelersModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isTravelersModalOpen]);

  const isHeaderDefault = isModalOpen || !scrolled;

  return (
    <>
      <header
        className={`${styles.header} ${
          isHeaderDefault ? styles.headerDefault : styles.headerScrolled
        }`}
      >
        <div className={`${styles.container} container`}>
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
          <div className={styles.searchItem} onClick={openSearchModal}>
            {!scrolled && <span className={styles.label}>Где</span>}
            <input
              type="search"
              placeholder={scrolled ? "Куда" : "Поиск направлений"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.input}
              aria-label="Поиск направлений"
              autoComplete="off"
            />
          </div>

          <div className={styles.divider} />

          <div
            className={styles.searchItem}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && setIsCalendarOpen(!isCalendarOpen)
            }
          >
            {!scrolled && <span className={styles.label}>Прибытие</span>}
            <span className={styles.placeholder}>
              {scrolled ? "Дата" : "Когда?"}
            </span>
          </div>

          {!scrolled && (
            <>
              <div className={styles.divider} />
              <div
                className={styles.searchItem}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsCalendarOpen(!isCalendarOpen)
                }
              >
                <span className={styles.label}>Выезд</span>
                <span className={styles.placeholder}>Когда?</span>
              </div>
            </>
          )}

          <div className={styles.divider} />

          <div
            className={`${styles.searchBarEnd} ${
              scrolled ? styles.searchBarEndScrolled : ""
            } ${isSearchActive ? styles.searchBarEndActive : ""}`}
            onClick={openTravelersModal}
          >
            <div
              className={styles.searchItem}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openTravelersModal()}
            >
              <div className={styles.label}>Кто</div>
              <div className={styles.placeholder}>Кто едет?</div>
            </div>

            <div
              className={`${styles.searchButton} ${
                scrolled ? styles.searchButtonScrolled : ""
              } ${isSearchActive ? styles.searchButtonActive : ""}`}
              onClick={openTravelersModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openTravelersModal()}
            >
              <img src={SearchIcon} alt="SearchIcon" />
              {isSearchActive && (
                <span className={styles.searchText}>Искать</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div ref={searchModalRef}>
          <SearchModal
            title="Рекомендуемые направления"
            placeholder="Введите город или страну"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            results={filteredDestinations}
            onSelect={handleSelect}
            onClose={closeSearchModal}
          />
        </div>
      )}

      <div
        className={`${styles.calendarWrapper} ${
          isCalendarOpen ? styles.calendarWrapperOpen : ""
        }`}
      >
        <Calendar onClose={() => setIsCalendarOpen(false)} />
      </div>

      {isTravelersModalOpen && (
        <div
          ref={travelersModalRef}
          style={{
            position: "absolute",
            top: "130px",
            right: "30px",
            zIndex: 10,
          }}
        >
          <TravelersModal onClose={closeTravelersModal} />
        </div>
      )}

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
    </>
  );
}

export default Header;
