import styles from './styles.module.scss';
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";
// import book from '../../../assets/book.svg'
// import code from '../../../assets/code.svg'
// import bolt from '../../../assets/bolt.svg'
// import data from '../../../assets/data.svg'
import logo from '../../../assets/logoBig.svg'
const StartPage = () =>{
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleNavigate = (path) => {
        navigate(path);
    };
    return (
        <>
            <div className={styles.StartPage}>
                <img src={logo} alt='logo' className={styles.logo} />
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
            </div>
        </>
    )
}
export default StartPage;
