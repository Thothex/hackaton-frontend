import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const HackatonDate = ({ props }) => {
    const { t } = useTranslation();
    const endDate = new Date(props.end);
    const startDate = new Date(props.start);
    const formattedStartDate = startDate.getDate();
    const startMonth = startDate.toLocaleString("en-US", { month: "long" });
    const startYear = startDate.getFullYear(); // Получаем год начала хакатона
    const formattedEndDate = endDate.getDate();
    const endMonth = endDate.toLocaleString("en-US", { month: "long" });
    const endYear = endDate.getFullYear(); // Получаем год окончания хакатона

    return (
        <div className={styles.hackathonPanelHeaderRight}>
            <h4 className={styles.date}>{formattedStartDate}</h4>
            <p className={styles.month}>{t(`ProfilePage.months.${startMonth}`)} {startYear}</p>
            <hr />
            <h4 className={styles.date}>{formattedEndDate}</h4>
            <p className={styles.month}>{t(`ProfilePage.months.${endMonth}`)} {endYear}</p>
        </div>
    );
};

export default HackatonDate;
