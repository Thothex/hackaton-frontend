import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {useDispatch, useSelector} from "react-redux";
import { deleteTask, updateTask } from "@/redux/features/hackathonsSlice";
import PropTypes from "prop-types";
import plus from "@/assets/plus.svg";
import remove from "@/assets/remove.svg";
import MainButton from "@/components/MainButton";
import CTextArea from "@/components/CTextArea";
import close from "@/assets/close.svg";
import Loading from "@/components/Loading";
import languages from "@/assets/highlihtLang/index.js";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula, prism} from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";


const ManyAnswerTask = ({ hackathonId, task, info }) => {
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
  const [ hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
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
    setHasUnsavedChanges(true)
  };

  const addAnaserVariantHander = () => {
    const newId = uuidv4();
    setAnswers({
      ...answers,
      [newId]: { text: "", isRight: false },
    });
    setHasUnsavedChanges(true)
  };

  const removeAnswerVariant = (uuid) => {
    const newAnswers = { ...answers };
    delete newAnswers[uuid];
    setAnswers(newAnswers);
    setHasUnsavedChanges(true)
  };

  const changeTitleHandler = (e) => {
    setTaskText(e.target.value)
    setHasUnsavedChanges(true)
  }

  const changeDescriptionHandler = (e) => {
    setTaskDescription(e.target.value)
    setHasUnsavedChanges(true)
  }
  const changeCodeHandler = (e) => {
    setTaskDescription(`<code language='${lang}'>${e.target.value}</code>`);
    setCodeInput(e.target.value);
    setHasUnsavedChanges(true);
  };

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


  const changeScoreHandler = (e) => {
    setTaskScore(+e.target.value)
    setHasUnsavedChanges(true)
  }

  const taskContainerClass = !hasUnsavedChanges ?
    `${styles.taskContainer} ${styles.greenBorder}` :
    `${styles.taskContainer} ${styles.redBorder}`

  const saveHander = () => {
    setHasUnsavedChanges(false)
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
    info()
  };

  const deleteHandler = () => {
    dispatch(deleteTask({ taskId: task.id }));
  };

  if (!answers) return <Loading />;
  return (
    <div className={taskContainerClass}>
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
                    <SyntaxHighlighter  language={`'${lang}'`} style={dracula} customStyle={{ fontSize: '20px'}}>
                      {codeInput}
                      {/*{'console.log(Hello)'}*/}
                    </SyntaxHighlighter>
                ) : (
                    <SyntaxHighlighter language={`'${lang}'`}  style={prism}
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
        <label>{t("HackathonEditPage.scores")}</label>
        <input
          className={styles.taskInput}
          onChange={(e) => changeScoreHandler(e)}
          type="number"
          value={taskScore || 0}
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

        <MainButton caption={t("ProfilePage.save")} onClick={saveHander} isDisabled={!hasUnsavedChanges}/>
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
    info: PropTypes.func,
  }),
};
export default ManyAnswerTask;
