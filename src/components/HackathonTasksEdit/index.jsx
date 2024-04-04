import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown, Space } from "antd";
import { addNewTask, createNewTask } from "@/redux/features/hackathonsSlice";
import ManyAnswerTask from "../TaskVariants/ManyAnswerTask";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import FileAnswerTask from "../TaskVariants/FileAnswerTask";
import OneInputTask from "../TaskVariants/OneInputTask";
import styles from "./styles.module.scss";
import plus from "@/assets/plus.svg";

const HackathonTasksEdit = ({ hackathonId }) => {
  const { t } = useTranslation();
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
        createNewTask({
          type: "input",
          maxScore: 10,
          answers: {},
          hackathonId,
        })
      );
  };

  const items = [
    {
      label: `${t("HackathonEditPage.multiple-answers")}`,
      key: "1",
    },
    {
      label: `${t("HackathonEditPage.file-upload")}`,
      key: "2",
    },
    {
      label: `${t("HackathonEditPage.free-answer")}`,
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const info = () => {
    message.success("Question saved");
  };

  return (
    <div>
      <h2 className={styles.title}>
        {t("HackathonEditPage.fill-in-the-task-info")}
          <div className={styles.infoCode}>
          <h6 className={styles.upload}>You can upload code as description of the task. To check if language is available, join <a href='https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD'>link</a>. The format of adding code:</h6>
              <p className={styles.code}>
                  {`<code language='yourLanguage'>`}
                  <span style={{ color: '#7d98e2' }}>your Code here</span>
                  {`</code>`}
              </p>
            <h6 className={styles.upload}>Only one block of code is allowed for description section! Language must be in lower case only</h6>
          </div>
      </h2>
      {tasks &&
        tasks.map((task, index) => {
          return (
            <div key={index}>
              {task.type === "many-answers" && (
                <ManyAnswerTask hackathonId={hackathonId} task={task} info={info} />
              )}
              {task.type === "document" && (
                <FileAnswerTask hackathonId={hackathonId} task={task} info={info} />
              )}
              {task.type === "input" && (
                <OneInputTask hackathonId={hackathonId} task={task} info={info} />
              )}
            </div>
          );
        })}
      <Dropdown menu={menuProps}>
        <button className={styles.chooseBtn}>
          <img src={plus} alt="plus" />
          <Space>{t("HackathonEditPage.choose-task-type")}</Space>
        </button>
      </Dropdown>
    </div>
  );
};

export default HackathonTasksEdit;
