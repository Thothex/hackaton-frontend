import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const AuthHeader = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.authHeader}>
      <h2 className={styles.title}>
        {t("Register-and-login-page.Welcome to the Thothex.hackaton platform")}
      </h2>
      <p className={styles.paragraph}>
        {t("Register-and-login-page.Solve problems, become stronger and win!")}
      </p>
    </div>
  );
};
export default AuthHeader;
