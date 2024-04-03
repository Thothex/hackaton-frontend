import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/redux/features/hackathonsSlice";
import PropTypes from "prop-types";
import MainButton from "@/components/MainButton";
import CTextArea from "@/components/CTextArea";
import close from "@/assets/close.svg";
import Loading from "@/components/Loading";

const OneInputTask = ({ hackathonId, task, info }) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState(task.answers);
  const [taskText, setTaskText] = useState(task.name || "");
  const [taskDescription, setTaskDescription] = useState(
    task.description || ""
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [taskScore, setTaskScore] = useState(task.maxScore);

  const dispatch = useDispatch();

  useEffect(() => {
    setAnswers(task.answers);
  }, [task]);

  const changeTitleHandler = (e) => {
    setTaskText(e.target.value);
    setHasUnsavedChanges(true);
  };

  const changeDescriptionHandler = (e) => {
    setTaskDescription(e.target.value);
    setHasUnsavedChanges(true);
  };

  const changeScoreHandler = (e) => {
    setTaskScore(+e.target.value);
    setHasUnsavedChanges(true);
  };

  const taskContainerClass = !hasUnsavedChanges
    ? `${styles.taskContainer} ${styles.greenBorder}`
    : `${styles.taskContainer} ${styles.redBorder}`;

  const saveHander = () => {
    setHasUnsavedChanges(false);
    dispatch(
      updateTask({
        hackathonId,
        task: {
          ...task,
          maxScore: taskScore,
          name: taskText,
          description: taskDescription,
          type: "input",
        },
      })
    );
    info();
  };

  const deleteHandler = () => {
    setHasUnsavedChanges(false);
    dispatch(deleteTask({ taskId: task.id }));
  };

  if (!answers) return <Loading />;
  return (
    <div className={taskContainerClass}>
      <div>
        <div className={styles.deleteBtnContainer}>
          <span className={styles.typeTask}>
            {t("HackathonEditPage.free-answer")}
          </span>
          <button className={styles.close} onClick={deleteHandler}>
            <img src={close} alt="close" className={styles.icon} />
          </button>
        </div>
        <label>{t("HackathonEditPage.title")}</label>
        <input
          value={taskText}
          onChange={(e) => changeTitleHandler(e)}
          placeholder={`${t("HackathonEditPage.enter-title")}`}
        />
        <label>{t("HackathonEditPage.description")}</label>
        <CTextArea
          inner={`${t("HackathonEditPage.enter-description")}`}
          type={"text"}
          name={"description"}
          value={taskDescription}
          onChange={(e) => changeDescriptionHandler(e)}
        />
        <label>{t("HackathonEditPage.scores")}</label>
        <input
          className={styles.taskInput}
          onChange={(e) => changeScoreHandler(e)}
          type="number"
          value={taskScore || 0}
          placeholder={`${t("HackathonEditPage.enter-scores")}`}
        />
      </div>
      <div className={styles.addNewAnswerBlock}>
        <MainButton
          caption={t("ProfilePage.save")}
          onClick={saveHander}
          isDisabled={!hasUnsavedChanges}
        />
      </div>
    </div>
  );
};

OneInputTask.propTypes = {
  hackathonId: PropTypes.string,
  task: PropTypes.shape({
    answers: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string,
    maxScore: PropTypes.number,
    info: PropTypes.func,
  }),
};
export default OneInputTask;
