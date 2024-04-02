import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import lang from "@/assets/mode/lang.svg";
import arrow from "@/assets/arrow.svg";
import { setLanguage } from "@/redux/features/languageSlice";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.language.language);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.langContainer}>
      <div className={styles.customSelect} onClick={toggleDropdown}>
        <img src={lang} alt="lang" className={styles.lang} />
        <span className={styles.selectedLanguage}>
          {selectedLanguage === "ru" ? "Русский" : "English"}
        </span>
        <img src={arrow} alt="arrow" className={styles.icon} />
        {isOpen && (
          <ul className={styles.options}>
            <li onClick={() => handleLanguageChange("ru")}>Русский</li>
            <li onClick={() => handleLanguageChange("en")}>English</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
