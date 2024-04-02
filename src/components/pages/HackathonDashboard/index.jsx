import { fetchHackathonStat } from "@/redux/features/hackathonsSlice";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Progress } from "antd";
import styles from "./styles.module.scss";
import CountdownTimer from "@/components/CountdownTimer";
import { useTranslation } from "react-i18next";

const HackathonDashboard = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const chartEl = useRef(null);
  const hackathonId = searchParams.get("id");
  const [chartInstance, setChartInstance] = useState(null);
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
      console.log("event in dashboard", eventData);
      if (
        eventData?.code === "dashboard_update" &&
        +hackathonId === eventData?.hackathonId
      ) {
        console.log("event code", event.data.code);
        console.log("МЫ ТОЧНО ДОЛЖНЫ ДЁРНУТЬ ДИСПАТЧ");
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

  useEffect(() => {
    if (stat.teams?.length > 0) {
      const ctx = chartEl.current;
      if (chartInstance) {
        chartInstance.destroy();
      }
      const teamNames = stat.teams.map((team) => team.name);
      const backgroundColors = [
        "#3e95cd",
        "#8e5ea2",
        "#3cba9f",
        "#3e95cd",
        "#8e5ea2",
        "#3cba9f",
        "#3e95cd",
        "#8e5ea2",
        "#3cba9f",
      ];
      const colors = backgroundColors.slice(0, stat.teams.length);
      const data = Array.from(
        { length: stat.tasks.length },
        (_, index) => index + 1
      );
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: teamNames,
          datasets: [
            {
              label: "Tasks done",
              backgroundColor: colors,
              data: stat.teams.map((team) => team.answers.length),
            },
          ],
        },
        options: {
          legend: { display: false },
          indexAxis: "y",
          title: {
            display: true,
            text: "Tasks done",
          },
          scales: {
            x: {
              type: "linear",
              grace: 2,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [stat]);

  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  const endData = new Date(stat.end).getTime();
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.innerContainer}>
      <div className={styles.countdownWrapper}>
        <CountdownTimer targetDate={endData} />
      </div>
      <div className={styles.blocksWrapper}>
        <div className={styles.blockWidget}>
          <h1 className={styles.widgetTitle}>
            {t("HackathonDashboard.Answers stat")}
          </h1>
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
                <div className={styles.progressWrapper} key={task.id}>
                  <h4>{task.name}</h4>
                  <Progress
                    percent={percent}
                    strokeColor={twoColors}
                    size={[500, 20]}
                    format={() => `${teamsAnsweredTask}`}
                  />
                  <div>
                    {teamsAnswered.map((team) => (
                      <div key={team.id}>{team.name}</div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.rowBlockWrapper}>
          <div className={styles.blockWidget}>
            <h1 className={styles.widgetTitle}>
              {t("HackathonDashboard.Teams answers")}
            </h1>
            {stat.teams &&
              stat.teams.map((team) => {
                const progress =
                  (team.answers.length * 100) / stat.tasks.length;
                return (
                  <div key={team.id}>
                    <h4>{team.name}</h4>
                    <Progress
                      percent={progress}
                      strokeColor={twoColors}
                      size={[500, 20]}
                      format={() =>
                        ` ${team.answers.length} of ${stat.tasks.length} tasks`
                      }
                    />
                  </div>
                );
              })}
          </div>
          <div className={styles.blockWidget}>
            <h1 className={styles.widgetTitle}>
              {t("HackathonDashboard.Teams score")}
            </h1>
            {stat.teams &&
              stat.teams.map((team) => {
                const currentScore = !team.answers.length
                  ? 0
                  : team.answers.reduce((acc, answer) => acc + answer.score, 0);
                const maxScore = stat.tasks.reduce(
                  (acc, task) => acc + task.maxScore,
                  0
                );
                const progress = (currentScore * 100) / maxScore;
                return (
                  <div className={styles.progressWrapper} key={team.id}>
                    <h4>{team.name}</h4>
                    <Progress
                      percent={progress}
                      strokeColor={twoColors}
                      size={[500, 20]}
                      format={() => ` ${currentScore} of ${maxScore}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div hidden className={styles.graphContainer}>
          <canvas ref={chartEl}></canvas>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HackathonDashboard;
