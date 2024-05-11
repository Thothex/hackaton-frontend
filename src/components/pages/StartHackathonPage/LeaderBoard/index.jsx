import styles from '../style.module.scss'
import {ConfigProvider, Modal, Progress, Tabs} from "antd";
import React, {Suspense, useEffect, useMemo, useState} from "react";
import Loading from "@/components/Loading/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchHackathonStat } from "@/redux/features/hackathonsSlice.js";
import avatar from "@/assets/avatar.png";
import {useTranslation} from "react-i18next";

const LazyActivity = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/activity.jsx"));
const LazyScore = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/score.jsx"));
const LazyTask = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/tasks.jsx"));

const LeaderBoard = ({ hackathonId }) => {
    const { t } = useTranslation();
    const stat = useSelector((state) => state.hackathons.hackathonStat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHackathonStat({ hackathonId }));
    }, [dispatch, hackathonId]);
    const [fullScreen, setFullScreen] = useState(false);
    const teamsPages = stat?.teams?.map(team => {
        const hasPages = team.answers && team.answers.some(answer => answer.pages !== undefined);
        const pages = hasPages ? team.answers.find(answer => answer.pages !== 0)?.pages : 0;

        return {
            name: team.name,
            users: team.users,
            pages: pages
        };
    });

    const sortedFive = teamsPages?.sort((a, b) => b.pages - a.pages || b.answers?.length - a.answers?.length).slice(0, 5);
    const SortedAll = teamsPages?.sort((a, b) => b.pages - a.pages || b.answers?.length - a.answers?.length)

    const maxPages = sortedFive?.length > 0 ? sortedFive[0].pages : 0;


    const sortedFiveScore = useMemo(() => {
        const teamsScores = stat?.teams?.map(team => {
            const score = team?.answers?.reduce((acc, answer) => acc + (answer.score || 0), 0);
            return {
                name: team.name,
                users: team.users,
                score: score
            };
        });

        return teamsScores?.sort((a, b) => b.score - a.score);
    }, [stat?.teams]);

    const maxScore = stat?.tasks?.reduce((acc, task) => acc + task.maxScore, 0);


    useEffect(() => {
        const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL);
        socket.onopen = () => {};
        socket.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            if (
                eventData?.code === "dashboard_update" &&
                +hackathonId === eventData?.hackathonId
            ) {
                dispatch(fetchHackathonStat({ hackathonId }));
            }
        };
        socket.onclose = () => {
            console.log("Connection closed");
        };
        socket.onerror = (error) => {
            console.error("Error:", error);
        };
        return () => {
            socket.close();
        };
    }, [dispatch, hackathonId]);


    if(!stat?.teams){
        return <Loading/>
    }



    return (
        <div className={styles.leaderContainer}>
            {stat?.teams &&  <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2D3748",
                        backgroundColor: "#ffffff",
                        colorBgContainer: "white",
                        margin: "0",
                        colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
                        colorTextBase: "#2D3748",
                        fontFamily: 'Geologica',
                        borderRadius: 20,
                        border: 'none',
                        fontSize: 14

                    },
                }}
            >
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    items={[
                        {
                            label: t("HackathonPage.Activity"),
                            key: "1",
                            children: <Suspense fallback={<Loading />}><LazyActivity stat={stat}   /></Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: t("HackathonPage.Score"),
                            key: "2",
                            children: <Suspense fallback={<Loading />}><LazyScore stat={stat} /></Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: t("HackathonPage.Tasks"),
                            key: "3",
                            children: <Suspense fallback={<Loading />}><LazyTask stat={stat}   /></Suspense>,
                            className: styles.tabFile,
                        },
                    ]}
                    className={styles.tabsContainer}
                ></Tabs>
                <div className={styles.moreContainer}>
                    <button className={styles.more} onClick={() => setFullScreen(!fullScreen)}>{t("HackathonPage.More")}</button>
                    {fullScreen && (
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: "#8797c4",
                                    backgroundColor: "#f5f7fa",
                                    colorBgContainer: "white",
                                    margin: "0",
                                    colorFillQuaternary: "#E0E5F3",
                                    colorTextBase: "#718096",
                                    fontFamily:'Geologica',
                                    width:'100vw',
                                    borderRadius:20,
                                    border:'none'
                                },
                            }}
                        >
                            <Modal
                                visible={fullScreen}
                                onCancel={() => setFullScreen(false)}
                                footer={null}
                                style={{ maxWidth: '90vw', background: 'transparent', boxShadow: 'none' }}
                                closeIcon={<button className={styles.close}></button>}
                            >
                                <Tabs
                                    defaultActiveKey="1"
                                    type="card"
                                    items={[
                                        {
                                            label: t("HackathonPage.Activity"),
                                            key: "1",
                                            children:
                                                <div className={styles.leaderboard}>
                                                    <h3 className={styles.title}>{t("HackathonPage.leadBoard")}</h3>
                                                    <div className={styles.leaderHeader}>
                                                        <div className={styles.leaderHeaderContainer}>
                                                            <h6>{t("HackathonPage.Team")}</h6>
                                                            <h6>{t("HackathonPage.Members")}</h6>
                                                            <h6>{t("HackathonPage.Pages")}</h6>
                                                        </div>
                                                    </div>
                                                    {SortedAll.map((team, index) => (
                                                        <div key={index} className={styles.leaderTop}>
                                                            <hr className={styles.bottomHr} />
                                                            <div className={styles.leaderupper}>
                                                                <div>{team?.name}</div>
                                                                <div>{team?.users?.map((user, index)=><p key={index}><img className={styles.ava}
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
                                            ,
                                            className: styles.tabFile,
                                        },
                                        {
                                            label: t("HackathonPage.Score"),
                                            key: "2",
                                            children:
                                                <div className={styles.leaderboard}>
                                                    <h3 className={styles.title}>{t("HackathonPage.leadBoard")}</h3>
                                                    <div className={styles.leaderHeader}>
                                                        <div className={styles.leaderHeaderContainer}>
                                                            <h6>{t("HackathonPage.Team")}</h6>
                                                            <h6>{t("HackathonPage.Members")}</h6>
                                                            <h6>{t("HackathonPage.Score")}</h6>
                                                        </div>
                                                    </div>
                                                    {sortedFiveScore.map((team, index) => (
                                                        <div key={index} className={styles.leaderTop}>
                                                            <hr className={styles.bottomHr}/>
                                                            <div className={styles.leaderupper}>
                                                                <div>{team?.name}</div>
                                                                <div>{team?.users?.map((user, index) => (
                                                                    <p key={index}><img className={styles.ava}
                                                                                        src={user.avatar ? `${import.meta.env.VITE_BASE_URL_AVATAR}/${user.id}/${user.avatar}` : avatar}/>
                                                                    </p>
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
                                            ,
                                            className: styles.tabFile,
                                        },
                                        {
                                            label: t("HackathonPage.Tasks"),
                                            key: "3",
                                            children:
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
                                                                                    <div
                                                                                        key={team?.id}>{team.name}</div>
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
                                                            })}
                                                    </div>
                                                </div>
                                            ,
                                            className: styles.tabFile,
                                        },
                                    ]}
                                    className={styles.tabsContainer}
                                ></Tabs>
                            </Modal>
                        </ConfigProvider>
                    )}
                </div>
            </ConfigProvider>}

        </div>
    )
}
export default LeaderBoard
