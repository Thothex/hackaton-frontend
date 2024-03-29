import { useEffect, useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;
import { Checkbox } from "antd";
import { Button } from "antd";
import styles from "./styles.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { updateTask } from "@/redux/features/hackathonsSlice";
import PropTypes from "prop-types";
import MainButton from "@/components/MainButton";
import CTextArea from "@/components/CTextArea";
import close from "@/assets/close.svg";

const OneInputTask = ({ hackathonId, task }) => {
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

  const saveHander = () => {
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
  };

  if (!answers) return <div>Loading...</div>;
  return (
    <div className={styles.taskContainer}>
      <div>
        <div className={styles.deleteBtnContainer}>
          <span className={styles.typeTask}>Free answer</span>
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
      <div className={styles.addNewAnswerBlock}>
        <MainButton caption="SAVE" onClick={saveHander} />
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
  }),
};
export default OneInputTask;
