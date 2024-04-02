import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeamList } from "@/redux/features/teamsSlice";
import styles from "./styles.module.scss";
import { fetchTasks } from "@/redux/features/taskSlice";
import {
  changeScore,
  fetchTeamAnswer,
  saveScores,
} from "@/redux/features/answersSlice";

const HackathonTeamPage = () => {
  const { t } = useTranslation();
  const { id, teamId } = useParams();
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teamsStore);
  const { tasks } = useSelector((state) => state.tasks);
  const { answers } = useSelector((state) => state.answersStore);
  const [team, setTeam] = useState(null);
  useEffect(() => {
    setTeam(teams.find((team) => team.id === +teamId));
  }, [teams, teamId]);
  useEffect(() => {
    dispatch(fetchTasks(id));
    dispatch(fetchTeamAnswer({ hackathonId: id, teamId }));
    if (!teams.length) {
      dispatch(fetchTeamList({ hackathonId: id }));
    }
  }, [dispatch, teams, id, teamId]);

  const handleChangeScore = (e) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    if (value < 0 || value > e.target.max || isNaN(value)) {
      e.target.value = "";
    }
    const answerid = +e.target.dataset.answerid;
    const score = +e.target.value;
    dispatch(changeScore({ answerid, score }));
  };

  const handleSaveScore = () => {
    const hackathonId = id;
    dispatch(saveScores({ answers, hackathonId }));
  };

  if (!answers.length) return <div></div>;

  return (
    <div className={styles.checkPageContainer}>
      <h1 className={styles.pageHeaderFont}>
        {t("HackathonCheckPage.Teams answers", { teamName: team?.name })}
      </h1>
      {tasks
        .filter((item) => item.type !== "many-answers")
        .map((task, index) => (
          <div key={task.id} className={styles.answerBlock}>
            <div className={styles.questionPart}>
              <h1 className={styles.partHeaderWrapper}>
                {t("HackathonCheckPage.Task")} {index + 1}
              </h1>
              <span className={styles.partContent}>{task.name}</span>
            </div>
            <div className={styles.questionPart}>
              <h1 className={styles.partHeaderWrapper}>
                {t("HackathonCheckPage.Description")}
              </h1>
              <span className={styles.partContent}>{task.description}</span>
            </div>
            <div className={styles.questionPart}>
              <div className={styles.partHeaderWrapper}>
                {t("HackathonCheckPage.Maximum score for the task")}:
                <span>{task.maxScore}</span>
              </div>
            </div>
            <div className={styles.questionPart}>
              <div className={styles.partHeaderWrapper}>
                {t("HackathonCheckPage.The team's response")}
              </div>
              {answers
                .filter((ans) => ans.taskId === task.id)
                .map((item) => (
                  <div key={item.id} className={styles.partContent}>
                    {item.answer.fileUrl ? (
                      <a
                        href={`${import.meta.env.VITE_BASE_URL_ANSWERS}${
                          item.answer.fileUrl
                        }`}
                        download="filename"
                      >
                        {t("HackathonCheckPage.download")}
                      </a>
                    ) : (
                      <div>{item.answer.answer}</div>
                    )}
                    <div className={styles.markBlock}>
                      <label className={styles.markLabel}>
                        {t("HackathonCheckPage.Set points")}
                      </label>
                      <input
                        className={styles.input}
                        data-answerid={item.id}
                        type="number"
                        min="0"
                        max={task.maxScore}
                        value={item.score || ""}
                        onChange={(e) => handleChangeScore(e)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      <button
        className={styles.btnUpdate}
        onClick={handleSaveScore}
        type="button"
      >
        {t("HackathonCheckPage.Give a rating")}
      </button>
    </div>
  );
};

export default HackathonTeamPage;
