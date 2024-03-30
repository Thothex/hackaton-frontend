import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import styles from "./styles.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { updateTask } from "@/redux/features/hackathonsSlice";
import PropTypes from "prop-types";
import plus from "@/assets/plus.svg";
import remove from "@/assets/remove.svg";
import MainButton from "@/components/MainButton";
import CTextArea from "@/components/CTextArea";
import close from "@/assets/close.svg";
import { Input } from 'antd';
// import { Checkbox } from 'antd';
import { Button } from 'antd';
import Loading from '@/components/Loading';
const { TextArea } = Input;



const ManyAnswerTask = ({ hackathonId, task }) => {
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

  if (!answers) return <Loading />;
  return (
    <div className={styles.taskContainer}>
      <div>
        <div className={styles.deleteBtnContainer}>
          <span className={styles.typeTask}>Multiple answers</span>
          <button className={styles.close}>
            <img src={close} alt="close" className={styles.icon} />
          </button>
        </div>
        <label>Title</label>
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter title"
        />
        <label>Description</label>
        <CTextArea
          inner="Enter description"
          type={"text"}
          name={"description"}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <label>Scores</label>
        <input
          className={styles.taskInput}
          onChange={(e) => setTaskScore(+e.target.value)}
          type="number"
          placeholder="Enter scores"
        />
      </div>
      <label>Answer variant</label>
      {Object.keys(answers).map((uuid) => {
        return (
          <div className={styles.answerInputBlock} key={uuid}>
            <input
              onChange={answerEditHandler}
              className={styles.taskInput}
              value={answers[uuid].text}
              placeholder="Enter answer variant"
              data-uuid={uuid}
            />
            <Checkbox
              className={styles.checkboxLabelRight}
              onChange={(e) => onChangeRightAnswer(e, uuid)}
              checked={answers[uuid].isRight}
            >
              <div className={styles.checkboxLabelRight}>Right answer</div>
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
          <span>Add answer variant</span>
        </button>
      </div>
      <div className={styles.addNewAnswerBlock}>
        <MainButton caption="SAVE" onClick={saveHander} />
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
