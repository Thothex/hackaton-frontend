import styles from '../style.module.scss'
import React from "react";
import {useTranslation} from "react-i18next";
import {Progress} from "antd";
const Task =({stat})=>{
    const {t} = useTranslation()
    return(
        <div className={styles.leaderboard}>
            <h3 className={styles.title}>{t("HackathonPage.leadBoard")}</h3>
            <div className={styles.leaderHeader}>
                <div className={styles.leaderHeaderContainer}>
                    <h6>{t("HackathonPage.Tasks")}</h6>
                    <h6>{t("HackathonPage.Teams")}</h6>
                    <h6>{t("HackathonPage.Done")}</h6>
                </div>
            </div>
            <div>
                {stat?.tasks &&
                    stat?.teams &&
                    stat.tasks.map((task) => {
                        const teamsAnswered = stat.teams.filter((team) =>
                            team.answers.find((answer) => answer.taskId === task.id)
                        );
                        const teamsAnsweredTask = stat.teams.reduce((acc, team) => {
                            const isAnswered = team.answers.find(
                                (answer) => answer.taskId === task.id
                            );
                            if (isAnswered) {
                                acc += 1;
                            }
                            return acc;
                        }, 0);
                        const percent = (teamsAnsweredTask * 100) / stat.teams.length;
                        return (
                            <div key={task?.id} className={styles.leaderTop}>
                                <hr className={styles.bottomHr}/>
                                <div className={styles.leaderupper}>
                                    <div>{task.name}</div>
                                    <div>
                                        {teamsAnswered.map((team) => (
                                            <div key={team?.id}>{team.name}</div>
                                        ))}
                                    </div>
                                    <Progress
                                        percent={percent}
                                        strokeColor='#97ABDF'
                                        size={['100%', 3]}
                                        format={() => `${teamsAnsweredTask}`}
                                    />
                                </div>
                            </div>
                        );
                    }).slice(0, 5)}
            </div>
        </div>
    )
}
export default React.memo(Task)