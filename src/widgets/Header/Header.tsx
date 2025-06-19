import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import TravelersModal from "../SearchModal/TravelersModal";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Calendar from "../Calendar/CalendarUp";

import type { IWeatherWidget } from "@/pages/Home/CardFilters/weatherWidget/weatherWidget.interface";
import WeatherWidget from "@/pages/Home/CardFilters/weatherWidget/weatherWidget";
import { getWeather } from "@/pages/Home/CardFilters/weatherWidget/weatherWidget.data";

type Destination = {
  name: string;
  description?: string;
  icon?: string;
};

type DatePicker = {
  startDate: Date | null;
  endDate: Date | null;
};

function pluralize(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function Header() {
  // убирает поиск при переходе на другие страницы (пока что переход лишь на /loginUserProfilePage)
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const hideSearchBar = currentPath === "/loginUserProfilePage";

  const [datePicker, setDatePicker] = useState<DatePicker>({
    startDate: null,
    endDate: null,
  });

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
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<IWeatherWidget[] | null>(null);

  // Состояния для взрослых, детей и младенцев
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const searchModalRef = useRef<HTMLDivElement>(null);
  const travelersModalRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const filteredDestinations = destinations.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    getWeather().then(setWeatherData);
  }, []);

  const handleSelect = (destination: Destination) => {
    console.log("Выбрали:", destination);
    setSearchValue(destination.name);
    setIsModalOpen(false);
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

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen((prev) => !prev);
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

      if (
        isCalendarOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isTravelersModalOpen, isCalendarOpen]);

  const isHeaderDefault = isModalOpen || !scrolled;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isLangDropdownOpen &&
        !document.querySelector(`.${styles.langWrapper}`)?.contains(target)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangDropdownOpen]);

  const totalTravelers = adults + children + infants;

  return (
    <>
      <header
        className={`${styles.header} ${
          isHeaderDefault ? styles.headerDefault : styles.headerScrolled
        }`}
      >
        <div className={styles.container}>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>

          {!hideSearchBar && (
            <h3
              className={`${styles.title} ${
                scrolled ? styles.titleScrolled : ""
              } ${!isTitleVisible ? styles.titleHidden : ""}`}
            >
              Живи у озера - дыши горами
            </h3>
          )}

          <div className={styles.mainContent}>
            <div className={styles.langWrapper}>

            {scrolled && weatherData && (
                <div className={styles.headerWeather}>
                  <WeatherWidget weathers={weatherData} inHeader />
                </div>
              )}

              <img
                src={LangIcon}
                className={styles.langIcon}
                onClick={toggleLangDropdown}
              />

              {isLangDropdownOpen && (
                <div className={`${styles.langDropdown} ${styles.show}`}>
                  <div
                    className={styles.langDropdownItems}
                    onClick={() => console.log("Выбран: Kg")}
                  >
                    Kg
                  </div>
                  <div
                    className={styles.langDropdownItems}
                    onClick={() => console.log("Выбран: Ru")}
                  >
                    Ru
                  </div>
                  <div
                    className={styles.langDropdownItems}
                    onClick={() => console.log("Выбран: En")}
                  >
                    En
                  </div>
                </div>
              )}
            </div>
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

        {!hideSearchBar && (
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

              {scrolled ? (
                <span className={styles.placeholder}>Дата</span>
              ) : datePicker.startDate ? (
                <span>
                  {format(datePicker.startDate, "d LLL.", { locale: ru })}
                </span>
              ) : (
                <span className={styles.placeholder}>Когда?</span>
              )}
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
                  {datePicker.endDate ? (
                    <span>
                      {format(datePicker.endDate, "d LLL.", { locale: ru })}
                    </span>
                  ) : (
                    <span className={styles.placeholder}>Когда?</span>
                  )}
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
                <div className={styles.placeholder}>
                  {totalTravelers > 0
                    ? `${totalTravelers} ${pluralize(
                        totalTravelers,
                        "гость",
                        "гостя",
                        "гостей"
                      )}`
                    : "Кто едет?"}
                </div>
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
        )}

        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className={`${styles.calendarWrapper} ${
              isCalendarOpen ? styles.calendarWrapperOpen : ""
            }`}
          >
            <Calendar
              values={datePicker}
              onChangeValue={setDatePicker}
              onClose={() => {
                setIsCalendarOpen(false);
              }}
            />
          </div>
        )}
      </header>

      {isModalOpen && (
        <div
          ref={searchModalRef}
          className={`${styles.modalWrapper} ${styles.modalWrapperOpen} ${
            scrolled ? styles.modalWrapperScrolled : ""
          }`}
        >
          <SearchModal
            title="Рекомендуемые направления"
            placeholder="Введите город или страну"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            results={filteredDestinations}
            onSelect={handleSelect}
            onClose={closeSearchModal}
            showInput={false}
          />
        </div>
      )}

      {isTravelersModalOpen && (
        <div
          ref={travelersModalRef}
          className={`${styles.travelersModalWrapper} ${
            styles.travelersModalWrapperOpen
          } ${scrolled ? styles.travelersModalWrapperScrolled : ""}`}
        >
          <TravelersModal
            adults={adults}
            children={children}
            infants={infants}
            setAdults={setAdults}
            setChildren={setChildren}
            setInfants={setInfants}
            onClose={closeTravelersModal}
          />
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
