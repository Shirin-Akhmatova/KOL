import React, { useState } from "react";
import { countryCodes } from "./countryCodes";
import styles from "./CustomCountryCode.module.scss";
import dropDownIcon from "../../assets/icons/dropDown.svg";

interface CountrySelectProps {
  onSelect: (code: string, country: string) => void;
}

const CustomCountryCode: React.FC<CountrySelectProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.code === "+996" && c.country === "Kyrgyzstan")!
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelection = (country: { code: string; country: string }) => {
    setSelectedCountry(country);
    onSelect(country.code, country.country);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper} onClick={toggleDropdown}>
        <input
          id="countryCode"
          type="text"
          className={`${styles.inputField} ${
            selectedCountry || isFocused ? styles.filled : ""
          }`}
          value={`${selectedCountry.country} (${selectedCountry.code})`}
          readOnly
          onFocus={() => {
            setIsFocused(true);
            setIsDropdownOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
        />

        <label
          htmlFor="countryCode"
          className={`${styles.floatingLabel} ${
            selectedCountry || isFocused ? styles.floating : ""
          }`}
        >
          Country Code
        </label>

        <img
          src={dropDownIcon}
          alt="dropdown"
          className={styles.dropdownIcon}
        />
      </div>

      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          {countryCodes.map((country, index) => (
            <li
              key={`${country.code}-${index}`}
              className={styles.dropdownOption}
              onClick={() => handleSelection(country)}
            >
              {country.country} ({country.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomCountryCode;
