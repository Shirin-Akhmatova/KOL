import { useState, useEffect } from "react";
import "./header.scss";
import Logo from "../../assets/icons/KOL.svg";
import LangIcon from "../../assets/icons/globe 3.svg";
import Person from "../../assets/icons/person.svg";
import BurgerMenu from "../../assets/icons/Burger.svg";
import SearchIcon from "../../assets/icons/magnifyingglass 2.svg";

function Header() {
  const [scrolled, setScrolled] = useState(false);

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
    <header className={`header ${scrolled ? "withBackground" : ""}`}>
      <div className="container">
        <a href="#">
          <img src={Logo} alt="Logo" />
        </a>
        <h3>Живи у озера - дыши горами</h3>
        <div className="mainContent">
          <img src={LangIcon} alt="LangIcon" />
          <div className="menu">
            <img src={BurgerMenu} alt="BurgerMenu" />
            <img src={Person} alt="Person" />
          </div>
        </div>
      </div>
      <div className="searchBar">
        <div className="searchItem">
          <span className="label">Где</span>
          <span className="placeholder">Поиск направлений</span>
        </div>
        <div className="divider" />
        <div className="searchItem">
          <span className="label">Прибытие</span>
          <span className="placeholder">Когда?</span>
        </div>
        <div className="divider" />
        <div className="searchItem">
          <span className="label">Выезд</span>
          <span className="placeholder">Когда?</span>
        </div>
        <div className="divider" />
        <div className="searchItem">
          <span className="label">Кто</span>
          <span className="placeholder">Кто едет?</span>
        </div>
        <div className="searchButton">
          <img src={SearchIcon} alt="SearchIcon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
