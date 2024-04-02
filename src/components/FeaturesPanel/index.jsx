import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/redux/features/modeSlice.js";
import style from "./style.module.scss";
import LanguageSwitcher from "./LanguageSwitcher";
const FeaturesPanel = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mode);

  return (
    <>
      <div className={style.settings}>
        <LanguageSwitcher />
        <div className={style.themeContainer}>
          <button
            id="theme-toggle-btn"
            className={`${style.panel}`}
            onClick={() => {
              dispatch(setMode(!darkMode));
            }}
            style={{
              backgroundColor: darkMode ? "#1F2733" : "#ffffff",
            }}
          >
            <p className={darkMode ? style.light : style.dark}></p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturesPanel;
