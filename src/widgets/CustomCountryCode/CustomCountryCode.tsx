import React, { useState, useEffect, useRef } from "react";
import { countryCodes } from "./countryCodes";
import styles from "./CustomCountryCode.module.scss";
import dropDownIcon from "../../assets/icons/dropDown.svg";

interface CountrySelectProps {
  onSelect: (code: string, country: string) => void;
}

const CustomCountryCode: React.FC<CountrySelectProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find(
      (c) => c.code === "+996" && c.country === "Kyrgyzstan"
    ) || countryCodes[0]
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Функция фильтрации по названию или коду
  const filteredCountries = searchTerm
    ? countryCodes.filter((c) => {
        const term = searchTerm.toLowerCase();
        if (/^[\d+]+$/.test(term)) {
          // если только цифры и + — фильтруем по коду страны
          return c.code.startsWith(term);
        } else {
          // иначе — по названию страны
          return c.country.toLowerCase().startsWith(term);
        }
      })
    : countryCodes;

  // Закрываем дропдаун при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setInputFocused(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelection = (country: { code: string; country: string }) => {
    setSelectedCountry(country);
    onSelect(country.code, country.country);
    setIsDropdownOpen(false);
    setSearchTerm("");
    setInputFocused(false);
  };

  const handleFocus = () => {
    setInputFocused(true);
    setIsDropdownOpen(true);
    setSearchTerm("");
  };

  const inputValue = inputFocused
    ? searchTerm
    : `${selectedCountry.country} (${selectedCountry.code})`;

  return (
    <div className={styles.inputContainer} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          id="countryCode"
          type="text"
          className={`${styles.inputField} ${inputValue ? styles.filled : ""}`}
          value={inputValue}
          onFocus={handleFocus}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Select country or code"
          autoComplete="off"
        />

        <label
          htmlFor="countryCode"
          className={`${styles.floatingLabel} ${
            inputValue ? styles.floating : ""
          }`}
        >
          Country Code
        </label>

        <img
          src={dropDownIcon}
          alt="dropdown"
          className={styles.dropdownIcon}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        />
      </div>

      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <li
                key={`${country.code}-${index}`}
                className={styles.dropdownOption}
                onClick={() => handleSelection(country)}
              >
                {country.country} ({country.code})
              </li>
            ))
          ) : (
            <li className={styles.dropdownOption}>No countries found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomCountryCode;
