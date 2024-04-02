import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import book from "../../../assets/book.svg";
import code from "../../../assets/code.svg";
import bolt from "../../../assets/bolt.svg";
import data from "../../../assets/data.svg";
import logo from "../../../assets/logo.svg";
const StartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.StartPage}>
        <h2 className={styles.Welcome}>{t("StartPage.welcome")}</h2>
        <div className={styles.titleContainer}>
          <h1>{t("StartPage.ESSENTIAL")}</h1>
          <h1>{t("StartPage.SKILLS")}</h1>
        </div>
        <p className={styles.paragraph}>
          {t("StartPage.join-educational-competitions")}
        </p>
        <p className={styles.paragraph}>{t("StartPage.curiosity")}</p>
        <p className={styles.paragraph}>{t("StartPage.shaped")}</p>
        <button
          onClick={() => {
            handleNavigate("/hackathon");
          }}
          className={styles.button}
        >
          {t("StartPage.hackatons")}
        </button>
        <h3 className={styles.valTitle}>{t("StartPage.OUR-VALUES")}</h3>
        <div className={styles.valuesContainer}>
          <div className={styles.values}>
            <img src={book} alt="book" />
            <h5>{t("StartPage.education")}</h5>
          </div>
          <div className={styles.values}>
            <img src={code} alt="code" />
            <h5>{t("StartPage.attracting")}</h5>
          </div>
          <div className={styles.values}>
            <img src={bolt} alt="bolt" />
            <h5>{t("StartPage.contribution")}</h5>
          </div>
          <div className={styles.values}>
            <img src={data} alt="data" />
            <h5>{t("StartPage.data-driven")}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
export default StartPage;
