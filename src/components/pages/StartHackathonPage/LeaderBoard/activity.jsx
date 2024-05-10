import styles from '../style.module.scss'
import {ConfigProvider, Modal, Progress, Tabs} from "antd";
import avatar from "@/assets/avatar.png";
import React, {Suspense, useState} from "react";
import Loading from "@/components/Loading/index.jsx";
import './index.css';
import {useTranslation} from "react-i18next";
const Activity = ({ stat }) => {
    const { t } = useTranslation();
    const teamsPages = stat?.teams?.map(team => {
        const hasPages = team.answers && team.answers.some(answer => answer.pages !== undefined);
        const pages = hasPages ? team.answers.find(answer => answer.pages !== 0)?.pages : 0;

        return {
            name: team.name,
            users: team.users,
            pages: pages
        };
    });

    const sortedFive = teamsPages?.sort((a, b) => b.pages - a.pages || (b.answers?.length || 0) - (a.answers?.length || 0)).slice(0, 5);

    const maxPages = sortedFive?.length > 0 ? sortedFive[0].pages : 0;


    return (
        <div className={styles.leaderboard}>
            <h3 className={styles.title}>Лидерборд</h3>
            <div className={styles.leaderHeader}>
                <div className={styles.leaderHeaderContainer}>
                    <h6>{t("HackathonPage.Team")}</h6>
                    <h6>{t("HackathonPage.Members")}</h6>
                    <h6>{t("HackathonPage.Pages")}</h6>
                </div>
            </div>
            {sortedFive.map((team, index) => (
                <div key={index} className={styles.leaderTop}>
                    <hr className={styles.bottomHr} />
                    <div className={styles.leaderupper}>
                        <div>{team?.name}</div>
                        <div>{team?.users.map((user, index)=><p key={index}><img className={styles.ava}
                            src={
                                user.avatar
                                    ? `${import.meta.env.VITE_BASE_URL_AVATAR}/${user.id}/${
                                        user.avatar
                                    }`
                                    : avatar
                            }
                        /></p>)}</div>
                        <div>
                            <p>{team?.pages}</p>
                            <Progress
                                percent={(team.pages / maxPages) * 100}
                                strokeColor='#97ABDF'
                                size={['100%', 3]}
                                showInfo={false}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default React.memo(Activity);