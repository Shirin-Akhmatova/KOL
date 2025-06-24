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
  const [isModalOpen, setIsModalOpen] = useState<
    "travalers" | "calendar" | "search" | null
  >(null);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] =
    useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isTitleVisible, setIsTitleVisible] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [seatchActive, setSeatchActive] = useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<IWeatherWidget[] | null>(null);

  // Состояния для взрослых, детей и младенцев
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const searchModalRef = useRef<HTMLDivElement>(null);
  const searchModalRefBtn = useRef<HTMLDivElement>(null);
  const travelersModalRef = useRef<HTMLDivElement>(null);
  const travelersModalRefBtn = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarRefBtn = useRef<HTMLDivElement>(null);
  const calendarRefBtn2 = useRef<HTMLDivElement>(null);

  console.log(isModalOpen);

  const filteredDestinations = destinations.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    getWeather().then(setWeatherData);
  }, []);

  const handleSelect = (destination: Destination) => {
    console.log("Выбрали:", destination);
    setSearchValue(destination.name);
    setIsModalOpen(null);
  };

  const openSearchModal = () => {
    setIsModalOpen("search");
  };

  const closeModal = () => {
    setIsModalOpen(null);
    if (seatchActive) {
      setSeatchActive(false);
    }
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
        isModalOpen == "search" &&
        !searchModalRef?.current?.contains(target) &&
        !searchModalRefBtn?.current?.contains(target)
      ) {
        setIsModalOpen(null);
      }

      if (
        isModalOpen === "travalers" &&
        !travelersModalRef?.current?.contains(target) &&
        !travelersModalRefBtn?.current?.contains(target)
      ) {
        setIsModalOpen(null);
      }

      if (
        isModalOpen === "calendar" &&
        !calendarRef?.current?.contains(target) &&
        !calendarRefBtn?.current?.contains(target) &&
        !calendarRefBtn2?.current?.contains(target)
      ) {
        setIsModalOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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
              {scrolled && weatherData && !hideSearchBar && (
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
            <div className={styles.dropdownOwerlay}>
              <div
                ref={searchModalRefBtn}
                className={styles.searchItem}
                onClick={openSearchModal}
              >
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
              {isModalOpen === "search" && (
                <div
                  ref={searchModalRef}
                  className={`${styles.modalWrapper} ${
                    styles.modalWrapperOpen
                  } ${scrolled ? styles.modalWrapperScrolled : ""}`}
                >
                  <SearchModal
                    title="Рекомендуемые направления"
                    placeholder="Введите город или страну"
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    results={filteredDestinations}
                    onSelect={handleSelect}
                    onClose={closeModal}
                    showInput={false}
                  />
                </div>
              )}
            </div>

            <div className={styles.divider} />

            <div className={styles.dropdownOwerlay}>
              <div
                className={styles.searchItem}
                ref={calendarRefBtn}
                onClick={() => setIsModalOpen("calendar")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsModalOpen("calendar")
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
              {isModalOpen === "calendar" && (
                <div
                  ref={calendarRef}
                  className={`${styles.calendarWrapper} ${
                    styles.calendarWrapperOpen
                  } ${scrolled ? styles.calendarWrapperScrolled : ""}`}
                >
                  <Calendar values={datePicker} onChangeValue={setDatePicker} />
                </div>
              )}
            </div>

            {!scrolled && (
              <>
                <div className={styles.divider} />
                <div
                  ref={calendarRefBtn2}
                  className={styles.searchItem}
                  onClick={() => setIsModalOpen("calendar")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setIsModalOpen("calendar")
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
            <div className={styles.dropdownOwerlay}>
              <div
                ref={travelersModalRefBtn}
                className={`${styles.searchBarEnd} ${
                  scrolled ? styles.searchBarEndScrolled : ""
                } ${styles.searchBarEndActive}`}
                onClick={() => setIsModalOpen("travalers")}
              >
                <div
                  className={styles.searchItem}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setIsModalOpen("travalers")
                  }
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
                  } ${seatchActive ? styles.searchButtonActive : ""}`}
                  onClick={() => {
                    setIsModalOpen("travalers");
                    setSeatchActive(true);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setIsModalOpen("travalers")
                  }
                >
                  <img src={SearchIcon} alt="SearchIcon" />
                  {seatchActive && (
                    <span className={styles.searchText}>Искать</span>
                  )}
                </div>
              </div>
              {isModalOpen === "travalers" && (
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
                    onClose={closeModal}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </header>

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
