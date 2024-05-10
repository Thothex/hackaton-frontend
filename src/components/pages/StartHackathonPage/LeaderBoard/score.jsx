import styles from '../style.module.scss'
import { Progress } from "antd";
import React, { useMemo } from "react";
import avatar from "@/assets/avatar.png";
import {useTranslation} from "react-i18next";

const Score = ({ stat }) => {
    const { t } = useTranslation();
    const sortedFive = useMemo(() => {
        const teamsScores = stat?.teams.map(team => {
            const score = team.answers.reduce((acc, answer) => acc + (answer.score || 0), 0);
            return {
                name: team.name,
                users: team.users,
                score: score
            };
        });

        return teamsScores.sort((a, b) => b.score - a.score).slice(0, 5);
    }, [stat?.teams]);

    const maxScore = useMemo(() => sortedFive.length > 0 ? sortedFive[0].score : 0, [sortedFive]);

    return (
        <div className={styles.leaderboard}>
            <h3 className={styles.title}>Лидерборд</h3>
            <div className={styles.leaderHeader}>
                <div className={styles.leaderHeaderContainer}>
                    <h6>{t("HackathonPage.Team")}</h6>
                    <h6>{t("HackathonPage.Members")}</h6>
                    <h6>{t("HackathonPage.Score")}</h6>
                </div>
            </div>
            {sortedFive.map((team, index) => (
                <div key={index} className={styles.leaderTop}>
                    <hr className={styles.bottomHr} />
                    <div className={styles.leaderupper}>
                        <div>{team?.name}</div>
                        <div>{team?.users.map((user, index) => (
                            <p key={index}><img className={styles.ava}
                                                src={user.avatar ? `${import.meta.env.VITE_BASE_URL_AVATAR}/${user.id}/${user.avatar}` : avatar}/></p>
                        ))}</div>
                        <div>
                            <p>{team?.score}</p>
                            <Progress
                                percent={(team.score / maxScore) * 100}
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

export default React.memo(Score);
