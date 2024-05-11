import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {useDispatch, useSelector} from "react-redux";
import { deleteTask, updateTask } from "@/redux/features/hackathonsSlice";
import PropTypes from "prop-types";
import MainButton from "@/components/MainButton";
import CTextArea from "@/components/CTextArea";
import close from "@/assets/close.svg";
import Loading from "@/components/Loading";
import languages from "@/assets/highlihtLang/index.js";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula, prism} from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import InfoTooltip from "@/components/InfoTooltip/index.jsx";

const OneInputTask = ({ hackathonId, task, info }) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState(task.answers);
  const [taskText, setTaskText] = useState(task.name || "");
  const [lang, setLang] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [code, setCode] = useState(false);
  const { darkMode } = useSelector((state) => state.mode);
  const [codeInput, setCodeInput] = useState('');
  const [taskDescription, setTaskDescription] = useState(
    task.description || ""
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [taskScore, setTaskScore] = useState(task.maxScore);
  const [link, setLink] = useState('');
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

  const changeCodeHandler = (e) => {
    setTaskDescription(`<code language='${lang}'>${e.target.value}</code>`);
    setCodeInput(e.target.value);
    setHasUnsavedChanges(true);
  };

  const changeLinkHandler =(e)=>{
    setLink(e.target.value)
  }

  const handleUserClick = (language) => {
    setLang(language.value);
    setSearchTerm("");
  };

  const filteredLanguages = languages.filter((language) =>
      language.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCodeChange = () =>{
    setCode(!code)
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setLang(value);
    setSearchTerm(value.trim());
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
          link:link
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
            <img src={close} alt="close" className={styles.icon}/>
          </button>
        </div>
        <label>{t("HackathonEditPage.title")}</label>
        <input
            value={taskText}
            onChange={(e) => changeTitleHandler(e)}
            placeholder={`${t("HackathonEditPage.enter-title")}`}
        />
        <div className={styles.codeContainer}>
          <h4>{t("HackathonEditPage.description")}</h4>
          <div className={styles.innerCode}>
            <p>code</p>
            <input checked={code} type={"radio"} className={styles.code}
                   onClick={() => handleCodeChange()}
            />
          </div>
        </div>
        {code ?
            (<>
              <input
                  value={lang}
                  onChange={(e) => handleInputChange(e)}
                  placeholder={t("HackathonEditPage.choose-language")}
                  className={styles.langInput}
                  autoComplete="off"
              />
              <div className={styles.autocompleteContainer}>
                {
                  <ul className={styles.autocompleteList}>
                    {filteredLanguages.map((language) => (
                        <li
                            key={language.value}
                            onClick={() => handleUserClick(language)}
                            className={styles.autocompleteItem}
                        >
                          {language.label}
                        </li>
                    ))}
                  </ul>
                }
              </div>
              <div>
                <p>{lang}</p>
                <CTextArea
                    inner={`${t("HackathonEditPage.enter-code")}`}
                    type={"text"}
                    name={"description"}
                    value={codeInput}
                    onChange={(e) => changeCodeHandler(e)}
                />
                {darkMode ? (
                    <SyntaxHighlighter language={`'${lang}'`} style={dracula} customStyle={{fontSize: '20px'}}>
                      {codeInput}
                      {/*{'console.log(Hello)'}*/}
                    </SyntaxHighlighter>
                ) : (
                    <SyntaxHighlighter language={`'${lang}'`} style={prism}
                                       customStyle={{fontSize: '20px', backgroundColor: 'white'}}>
                      {/*{'console.log(Hello)'}*/}
                      {codeInput}
                    </SyntaxHighlighter>
                )}
              </div>
            </>) : (
                <CTextArea
                    inner={`${t("HackathonEditPage.enter-description")}`}
                    type={"text"}
                    name={"description"}
                    value={taskDescription}
                    onChange={(e) => changeDescriptionHandler(e)}
                />
            )

        }
        <div className={styles.link}><label>{t("HackathonEditPage.Link")}</label> <InfoTooltip text={t("HackathonEditPage.addLink")}/> </div>

        <input
            value={link}
            onChange={(e) => changeLinkHandler(e)}
            placeholder='Link'
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
