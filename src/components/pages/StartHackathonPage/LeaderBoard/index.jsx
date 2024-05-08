import styles from '../style.module.scss'
import { ConfigProvider, Tabs } from "antd";
import React, { Suspense, useEffect } from "react";
import Loading from "@/components/Loading/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchHackathonStat } from "@/redux/features/hackathonsSlice.js";

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
                            label: 'Активность',
                            key: "1",
                            children: <Suspense fallback={<Loading />}><LazyActivity stat={stat} /></Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: 'Счет',
                            key: "2",
                            children: <Suspense fallback={<Loading />}><LazyScore stat={stat} /></Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: 'Задания',
                            key: "3",
                            children: <Suspense fallback={<Loading />}><LazyTask stat={stat} /></Suspense>,
                            className: styles.tabFile,
                        },
                    ]}
                    className={styles.tabsContainer}
                ></Tabs>
            </ConfigProvider>}

        </div>
    )
}
export default LeaderBoard
