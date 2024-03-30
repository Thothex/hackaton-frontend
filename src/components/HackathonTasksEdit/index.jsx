import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown, Space } from "antd";
import { addNewTask, createNewTask } from "@/redux/features/hackathonsSlice";
import ManyAnswerTask from "../TaskVariants/ManyAnswerTask";
import { v4 as uuidv4 } from "uuid";
import FileAnswerTask from "../TaskVariants/FileAnswerTask";
import OneInputTask from "../TaskVariants/OneInputTask";
import styles from "./styles.module.scss";
import plus from "@/assets/plus.svg";

const HackathonTasksEdit = ({ hackathonId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.hackathons.currentHackathonTasks);

  const handleMenuClick = (e) => {
    if (e.key === "1")
      dispatch(
        createNewTask({
          type: "many-answers",
          maxScore: 10,
          answers: {},
          hackathonId,
        })
      );
    if (e.key === "2")
      dispatch(
        createNewTask({
          type: "document",
          maxScore: 10,
          answers: {},
          hackathonId,
        })
      );
    if (e.key === "3")
      dispatch(
        createNewTask({ type: "input", maxScore: 10, answers: {}, hackathonId })
      );
  };

  const items = [
    {
      label: "Multiple answers",
      key: "1",
    },
    {
      label: "File upload",
      key: "2",
    },
    {
      label: "Free answer",
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <h2>Fill in the task information</h2>

      {tasks &&
        tasks.map((task, index) => {
          return (
            <div key={index}>
              {task.type === "many-answers" && (
                <ManyAnswerTask hackathonId={hackathonId} task={task} />
              )}
              {task.type === "document" && (
                <FileAnswerTask hackathonId={hackathonId} task={task} />
              )}
              {task.type === "input" && (
                <OneInputTask hackathonId={hackathonId} task={task} />
              )}
            </div>
          );
        })}
      <Dropdown menu={menuProps}>
        <button className={styles.chooseBtn}>
          <img src={plus} alt="plus" />
          <Space>Choose task type</Space>
        </button>
      </Dropdown>
    </div>
  );
};

export default HackathonTasksEdit;
