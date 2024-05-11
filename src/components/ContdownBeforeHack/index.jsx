import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from "react-i18next";

const CountdownBeforeHack = ({ targetDate }) => {
    const { t } = useTranslation();

    const daysLabel = t("HackathonTeamPage.days");
    const hoursLabel = t("HackathonTeamPage.hours");
    const minutesLabel = t("HackathonTeamPage.mins");
    const secondsLabel = t("HackathonTeamPage.seconds");

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            timeLeft = {
                days: days > 1 ? `${days} ${daysLabel}` : `${days} ${t("HackathonTeamPage.days1")}`,
                hours: hours > 1 ? `${hours} ${hoursLabel}` : `${hours} ${t("HackathonTeamPage.hour1")}`,
                minutes: minutes > 1 ? `${minutes} ${minutesLabel}` : `${minutes} ${t("HackathonTeamPage.min1")}`,
                seconds: seconds > 1 ? `${seconds} ${secondsLabel}` : `${seconds} ${t("HackathonTeamPage.sec")}`
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]}{' '}
            </span>
        );
    });

    return (
        <div className={styles.counter}>
            <p className={styles.begin}>{t("HackathonTeamPage.willBegin")}</p>
            {timerComponents.length ? timerComponents : <p>Time's up!</p>}
        </div>
    );
};

export default CountdownBeforeHack;
