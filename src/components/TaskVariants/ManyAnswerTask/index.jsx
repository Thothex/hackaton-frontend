import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/redux/features/hackathonsSlice";
import PropTypes from "prop-types";
import plus from "@/assets/plus.svg";
import remove from "@/assets/remove.svg";
import MainButton from "@/components/MainButton";
import CTextArea from "@/components/CTextArea";
import close from "@/assets/close.svg";
import Loading from "@/components/Loading";

const ManyAnswerTask = ({ hackathonId, task }) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState(task.answers);
  const [taskText, setTaskText] = useState(task.name || "");
  const [taskDescription, setTaskDescription] = useState(
    task.description || ""
  );
  const [taskScore, setTaskScore] = useState(task.maxScore);

  const dispatch = useDispatch();

  useEffect(() => {
    setAnswers(task.answers);
  }, [task]);

  const onChangeRightAnswer = (e, uuid) => {
    const { checked } = e.target;
    setAnswers({
      ...answers,
      [uuid]: {
        ...answers[uuid],
        isRight: checked,
      },
    });
  };
  const answerEditHandler = (e) => {
    const { value, dataset } = e.target;
    const { uuid } = dataset;
    setAnswers({
      ...answers,
      [uuid]: {
        ...answers[uuid],
        text: value,
      },
    });
  };

  const addAnaserVariantHander = () => {
    const newId = uuidv4();
    setAnswers({
      ...answers,
      [newId]: { text: "", isRight: false },
    });
  };

  const removeAnswerVariant = (uuid) => {
    const newAnswers = { ...answers };
    delete newAnswers[uuid];
    setAnswers(newAnswers);
  };

  const saveHander = () => {
    dispatch(
      updateTask({
        hackathonId,
        task: {
          ...task,
          answers,
          maxScore: taskScore,
          name: taskText,
          description: taskDescription,
          type: "many-answers",
        },
      })
    );
  };

  const deleteHandler = () => {
    dispatch(deleteTask({ taskId: task.id }));
  };

  if (!answers) return <Loading />;
  return (
    <div className={styles.taskContainer}>
      <div>
        <div className={styles.deleteBtnContainer}>
          <span className={styles.typeTask}>
            {t("HackathonEditPage.multiple-answers")}
          </span>
          <button className={styles.close} onClick={deleteHandler}>
            <img src={close} alt="close" className={styles.icon} />
          </button>
        </div>
        <label>{t("HackathonEditPage.title")}</label>
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder={`${t("HackathonEditPage.enter-title")}`}
        />
        <label>{t("HackathonEditPage.description")}</label>
        <CTextArea
          inner={`${t("HackathonEditPage.enter-description")}`}
          type={"text"}
          name={"description"}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <label>{t("HackathonEditPage.scores")}</label>
        <input
          className={styles.taskInput}
          onChange={(e) => setTaskScore(+e.target.value)}
          value={taskScore}
          type="number"
          placeholder={`${t("HackathonEditPage.enter-scores")}`}
        />
      </div>
      <label>{t("HackathonEditPage.answer-variant")}</label>
      {Object.keys(answers).map((uuid) => {
        return (
          <div className={styles.answerInputBlock} key={uuid}>
            <input
              onChange={answerEditHandler}
              className={styles.taskInput}
              value={answers[uuid].text}
              placeholder={`${t("HackathonEditPage.enter-answer-variant")}`}
              data-uuid={uuid}
            />
            <Checkbox
              className={styles.checkboxLabelRight}
              onChange={(e) => onChangeRightAnswer(e, uuid)}
              checked={answers[uuid].isRight}
            >
              <div className={styles.checkboxLabelRight}>
                {t("HackathonEditPage.right-answer")}
              </div>
            </Checkbox>
            <button
              onClick={() => removeAnswerVariant(uuid)}
              className={styles.deleteBtn}
            >
              <img src={remove} alt="delete" />
            </button>
          </div>
        );
      })}
      <div className={styles.addNewAnswerBlock}>
        <button
          onClick={addAnaserVariantHander}
          className={styles.addVariantBtn}
        >
          <img src={plus} alt="plus" />
          <span>{t("HackathonEditPage.add-answer-variant")}</span>
        </button>
      </div>
      <div className={styles.addNewAnswerBlock}>
        <MainButton caption={t("ProfilePage.save")} onClick={saveHander} />
      </div>
    </div>
  );
};

ManyAnswerTask.propTypes = {
  hackathonId: PropTypes.string,
  task: PropTypes.shape({
    answers: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string,
    maxScore: PropTypes.number,
  }),
};
export default ManyAnswerTask;
