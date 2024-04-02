import React from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const HackathonPanel = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentDate = new Date();
  const endDate = new Date(props.end);
  const startDate = new Date(props.start);
  const { darkMode } = useSelector((state) => state.mode);
  const isOwn = props.user.id === props.organizer_id;
  let status;

  if (currentDate < startDate) {
    status = "Registration is open";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    status = "In progress";
  } else {
    status = "Finished";
  }

  const formattedStartDate = startDate.getDate();
  const startMonth = startDate.toLocaleString("en-US", { month: "long" });
  const formattedEndDate = endDate.getDate();
  const endMonth = endDate.toLocaleString("en-US", { month: "long" });
  return (
    <div
      className={`${styles.hackathonPanel} ${darkMode && styles.darkPanel} ${
        status === "Registration is open"
          ? styles.panelOpen
          : status === "In progress"
          ? styles.panelInProgress
          : status === "Finished"
          ? styles.panelClosed
          : ""
      }`}
    >
      <div className={styles.hackathonPanelHeader}>
        <div className={styles.hackathonPanelHeaderLeft}>
          <h3 className={styles.title}>{props.name}</h3>
          <div
            className={`${styles.status} ${
              status === "Registration is open"
                ? styles.registrationOpen
                : status === "In progress"
                ? styles.inProgress
                : status === "Finished"
                ? styles.finished
                : ""
            }`}
          >
            {t(`HomePage.${status}`)}
          </div>
          <h3 className={styles.area}>
            {t(`ProfilePage.categories.${props.category.toLowerCase()}`)}
          </h3>
        </div>
        <div className={styles.hackathonPanelHeaderRight}>
          <h4 className={styles.date}>{formattedStartDate}</h4>
          <p className={styles.month}>
            {t(`ProfilePage.months.${startMonth}`)}
          </p>
          <hr />
          <h4 className={styles.date}>{formattedEndDate}</h4>
          <p className={styles.month}>{t(`ProfilePage.months.${endMonth}`)}</p>
        </div>
      </div>
      <div className={styles.btnPanel}>
        <button
          className={`${styles.button} ${
            status === "Registration is open"
              ? styles.panelOpenButton
              : status === "In progress"
              ? styles.panelInProgressButton
              : status === "Finished"
              ? styles.panelClosedButton
              : ""
          }`}
          onClick={() => {
            navigate(`/hackathon/${props.id}`);
          }}
        >
          {t(`HomePage.READ MORE`)}
        </button>
        {isOwn && (
          <>
            <button
              type="button"
              onClick={() => navigate(`/hackathon/${props.id}/edit`)}
              className={styles.button}
            >
              {t(`HomePage.EDIT`)}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/hackathon/${props.id}/check`)}
              className={styles.button}
            >
              {t(`HomePage.CHECK`)}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

HackathonPanel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  organizer_id: PropTypes.number,
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
};

export default HackathonPanel;
