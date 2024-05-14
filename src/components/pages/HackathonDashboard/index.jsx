import { fetchHackathonStat } from "@/redux/features/hackathonsSlice";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {ConfigProvider, Progress, Tabs} from "antd";
import styles from "./styles.module.scss";
import CountdownTimer from "@/components/CountdownTimer";
import { useTranslation } from "react-i18next";
import NewHachathon from "@/components/NewHachathon/index.jsx";
import HackathonTasksEdit from "@/components/HackathonTasksEdit/index.jsx";
import Loading from "@/components/Loading/index.jsx";

const HackathonDashboard = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const chartEl = useRef(null);
  const hackathonId = searchParams.get("id");
  const [chartInstance, setChartInstance] = useState(null);
  const stat = useSelector((state) => state.hackathons.hackathonStat);
  const dispatch = useDispatch();
  const [maxPages, setMaxPages] = useState(0);
  // const teamsPages = stat?.teams?.map(team => {
  //   const hasPages = team.answers && team.answers.some(answer => answer.pages !== undefined);
  //   const pages = hasPages ? team.answers.find(answer => answer.pages !== 0)?.pages : 0;
  //
  //   return {
  //     name: team.name,
  //     users: team.users,
  //     pages: pages
  //   };
  // });
  //
  // const sortedFive = teamsPages?.sort((a, b) => b.pages - a.pages || (b.answers?.length || 0) - (a.answers?.length || 0));
  //
  // const maxPages = sortedFive?.length > 0 ? sortedFive[0].pages : 0;



  useEffect(() => {
    dispatch(fetchHackathonStat({ hackathonId }));
  }, [dispatch, hackathonId]);

  useEffect(() => {
    // Получение данных о страницах здесь
    const teamsPages = stat?.teams?.map(team => {
      const hasPages = team.answers && team.answers.some(answer => answer.pages !== undefined);
      const pages = hasPages ? team.answers.find(answer => answer.pages !== 0)?.pages : 0;

      return {
        name: team.name,
        users: team.users,
        pages: pages
      };
    });

    const sortedFive = teamsPages?.sort((a, b) => b.pages - a.pages || (b.answers?.length || 0) - (a.answers?.length || 0));
    setMaxPages(sortedFive?.length > 0 ? sortedFive[0].pages : 0);
  }, [dispatch, hackathonId, stat]);

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

  // useEffect(() => {
  //   if (stat.teams?.length > 0) {
  //     const ctx = chartEl.current;
  //     if (chartInstance) {
  //       chartInstance.destroy();
  //     }
  //     const teamNames = stat.teams.map((team) => team.name);
  //     const backgroundColors = [
  //       "#3e95cd",
  //       "#8e5ea2",
  //       "#3cba9f",
  //       "#3e95cd",
  //       "#8e5ea2",
  //       "#3cba9f",
  //       "#3e95cd",
  //       "#8e5ea2",
  //       "#3cba9f",
  //     ];
  //     const colors = backgroundColors.slice(0, stat.teams.length);
  //     const data = Array.from(
  //       { length: stat.tasks.length },
  //       (_, index) => index + 1
  //     );
  //     const newChartInstance = new Chart(ctx, {
  //       type: "bar",
  //       data: {
  //         labels: teamNames,
  //         datasets: [
  //           {
  //             label: "Tasks done",
  //             backgroundColor: colors,
  //             data: stat.teams.map((team) => team.answers.length),
  //           },
  //         ],
  //       },
  //       options: {
  //         legend: { display: false },
  //         indexAxis: "y",
  //         title: {
  //           display: true,
  //           text: "Tasks done",
  //         },
  //         scales: {
  //           x: {
  //             type: "linear",
  //             grace: 2,
  //             grid: {
  //               display: false,
  //               drawBorder: false,
  //             },
  //             ticks: {
  //               stepSize: 1,
  //               beginAtZero: true,
  //             },
  //           },
  //         },
  //       },
  //     });
  //     setChartInstance(newChartInstance);
  //   }
  //   return () => {
  //     if (chartInstance) {
  //       chartInstance.destroy();
  //     }
  //   };
  // }, [stat]);

  const twoColors = {
    "0%": "#d2dcf8",
    "100%": "#8797c4",
  };
  const endData = new Date(stat.end).getTime();


  if(!stat?.name){
    return(
        <Loading/>
    )
  }
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.innerContainer}>
      <div className={styles.countdownWrapper}>
        <CountdownTimer targetDate={endData} />
      </div>
        <h1 className={styles.title}>{stat?.name}</h1>
        <div className={styles.tabsContainer}></div>
        <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#8797c4",
                backgroundColor: "#f5f7fa",
                colorBgContainer: "white",
                margin: "0",
                colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
                colorTextBase: "rgba(113, 128, 150, 1)",
                borderRadius:20
              },
            }}
        >
          <Tabs
              defaultActiveKey="1"
              type="card"
              items={[
                {
                  label: `${t("HackathonDashboard.Answers stat")}`,
                  key: "1",
                  children:
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
                              <div key={task?.id}>
                                <div className={styles.human} >
                                <h4>{task.name}</h4>
                                <div>
                                  {teamsAnswered.map((team) => (
                                    <h5 key={team?.id}>{team.name}</h5>
                                  ))}
                                </div>
                                <Progress
                                    percent={percent}
                                    strokeColor={twoColors}
                                    className={styles.progress}
                                    size={['80%', 20]}
                                    format={() => `${teamsAnsweredTask}`}
                                />
                              </div>
                                <hr/>
                              </div>
                            );
                          })}
                  </div>
                  ,
                  className: styles.tabFile,
                },
                {
                  label: `${t("HackathonDashboard.Activity")}`,
                  key: "2",
                  children:
                      <div className={styles.childContainer}>
                        {stat.teams &&
                          stat.teams
                          .slice()
                          .sort((teamA, teamB) => {
                          const totalPagesA = teamA.answers.reduce((acc, answer) => (answer.pages ? acc + answer.pages : acc), 0);
                          const totalPagesB = teamB.answers.reduce((acc, answer) => (answer.pages ? acc + answer.pages : acc), 0);
                          return totalPagesB - totalPagesA;
                        })
                                .map((team) => {
                              const totalPages = team.answers.reduce((acc, answer) => {
                                return acc + answer.pages;
                              }, 0);
                              const progress = maxPages > 0 ?
                                  (totalPages * 100) / maxPages :
                                  (team.answers.length * 100) / stat.tasks.length;
                                  const updatedAtString = team?.answers[0]?.updatedAt;
                                  const updatedAt = new Date(updatedAtString);

                                  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                                  const timeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

                                  const formattedDate = updatedAt.toLocaleDateString('ru-RU', dateFormatOptions);
                                  const formattedTime = updatedAt.toLocaleTimeString('ru-RU', timeFormatOptions);

                                  return (
                                  <div key={team?.id}>
                                    <div className={styles.human}>
                                      <h4>{team.name}</h4>
                                      <Progress
                                          percent={progress}
                                          strokeColor={twoColors}
                                          className={styles.progress}
                                          size={['80%', 20]}
                                          format={() =>
                                              maxPages > 0 ?
                                                  ` ${totalPages} of ${maxPages} annotations` :
                                                  ` ${totalPages} of ${team.answers.length} answers`
                                          }
                                      />
                                      {formattedDate !== 'Invalid Date' && formattedTime !== 'Invalid Date' ?
                                          <div className={styles.updated}>
                                            <h5><p>Дата обновления: </p> {formattedDate}</h5>
                                            <h5><p>Время обновления: </p> {formattedTime}</h5>
                                          </div>
                                          :
                                          <div className={styles.updated}>
                                            <h5><p>Дата обновления: </p> нет данных</h5>
                                            <h5><p>Время обновления: </p> нет данных</h5>
                                          </div>
                                      }

                                    </div>
                                    <hr/>
                                  </div>
                                  );
                                })}
                      </div>


                  ,
                  className: styles.tabFile,
                },
                {
                  label: `${t("HackathonDashboard.Teams score")}`,
                  key: "3",
                  children:
                      <div>
                        {stat.teams &&
                            stat.teams
                                .slice()
                                .sort((teamA, teamB) => {
                                  const scoreA = teamA.answers.reduce((acc, answer) => acc + answer.score, 0);
                                  const scoreB = teamB.answers.reduce((acc, answer) => acc + answer.score, 0);
                                  return scoreB - scoreA;
                                })
                                .map((team) => {
                                  const currentScore = !team.answers.length ? 0 : team.answers.reduce((acc, answer) => acc + answer.score, 0);
                                  const maxScore = stat.tasks.reduce((acc, task) => acc + task.maxScore, 0);
                                  const progress = (currentScore * 100) / maxScore;
                                  return (
                                      <div key={team.id}>
                                        <div className={styles.human} >
                                        <h4>{team.name}</h4>
                                        <Progress
                                            percent={progress}
                                            strokeColor={twoColors}
                                            className={styles.progress}
                                            size={['80%', 20]}
                                            format={() => ` ${currentScore} of ${maxScore}`}
                                        />
                                      </div>
                                        <hr/>
                                      </div>

                                  );
                                })}

                      </div>
                  ,
                  className: styles.tabFile,
                },
              ]}
              className={styles.tabsContainer}
          ></Tabs>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default HackathonDashboard;
