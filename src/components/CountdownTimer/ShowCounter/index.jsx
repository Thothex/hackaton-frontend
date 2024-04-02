import DateTimeDisplay from "../DateTimeDisplay";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.showCounter}>
      <DateTimeDisplay
        value={days}
        type={t("HackathonTeamPage.Days")}
        isDanger={days === 0 && hours < 3}
      />
      <DateTimeDisplay
        value={hours}
        type={t("HackathonTeamPage.Hours")}
        isDanger={days === 0 && hours < 3}
      />
      <DateTimeDisplay
        value={minutes}
        type={t("HackathonTeamPage.Mins")}
        isDanger={days === 0 && hours < 3}
      />
      <DateTimeDisplay
        value={seconds}
        type={t("HackathonTeamPage.Seconds")}
        isDanger={days === 0 && hours < 3}
      />
    </div>
  );
};

export default ShowCounter;
