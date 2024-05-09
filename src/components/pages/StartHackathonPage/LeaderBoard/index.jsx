import styles from '../style.module.scss'
import {ConfigProvider, Modal, Progress, Tabs} from "antd";
import React, {Suspense, useEffect, useState} from "react";
import Loading from "@/components/Loading/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchHackathonStat } from "@/redux/features/hackathonsSlice.js";
import avatar from "@/assets/avatar.png";

const LazyActivity = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/activity.jsx"));
const LazyScore = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/score.jsx"));
const LazyTask = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/tasks.jsx"));

const LeaderBoard = ({ hackathonId }) => {
    console.log(hackathonId)
    const stat = useSelector((state) => state.hackathons.hackathonStat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHackathonStat({ hackathonId }));
    }, [dispatch, hackathonId]);
    const [fullScreen, setFullScreen] = useState(false);
    const teamsPages = stat?.teams?.map(team => {
        return {
            name: team.name,
            users: team.users,
            pages: team?.answers && team?.answers?.length > 0 ? team?.answers[0]?.pages : 0
        };
    });

    const sortedFive = teamsPages?.sort((a, b) => b.pages - a.pages || b.answers?.length - a.answers?.length).slice(0, 5);
    const SortedAll = teamsPages?.sort((a, b) => b.pages - a.pages || b.answers?.length - a.answers?.length)

    const maxPages = sortedFive?.length > 0 ? sortedFive[0].pages : 0;


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
                            label: 'Активность',
                            key: "1",
                            children: <Suspense fallback={<Loading />}><LazyActivity stat={stat} hackathonId={hackathonId}  /></Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: 'Счет',
                            key: "2",
                            children: <Suspense fallback={<Loading />}><LazyScore stat={stat} hackathonId={hackathonId}  /></Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: 'Задания',
                            key: "3",
                            children: <Suspense fallback={<Loading />}><LazyTask stat={stat} hackathonId={hackathonId}  /></Suspense>,
                            className: styles.tabFile,
                        },
                    ]}
                    className={styles.tabsContainer}
                ></Tabs>
                <div className={styles.moreContainer}>
                    <button className={styles.more} onClick={() => setFullScreen(!fullScreen)}>More</button>
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
                                            label: 'Активность',
                                            key: "1",
                                            children:
                                                <div className={styles.leaderboard}>
                                                    <h3 className={styles.title}>Лидерборд</h3>
                                                    <div className={styles.leaderHeader}>
                                                        <div className={styles.leaderHeaderContainer}>
                                                            <h6>Team</h6>
                                                            <h6>Members</h6>
                                                            <h6>Pages</h6>
                                                        </div>
                                                    </div>
                                                    {SortedAll.map((team, index) => (
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
                                            ,
                                            className: styles.tabFile,
                                        },
                                        {
                                            label: 'Счет',
                                            key: "2",
                                            children: 'child',
                                            className: styles.tabFile,
                                        },
                                        {
                                            label: 'Задания',
                                            key: "3",
                                            children: 'child',
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
