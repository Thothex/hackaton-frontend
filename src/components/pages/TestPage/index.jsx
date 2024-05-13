import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import InputTask from "@/components/InputTask";
import AddFileTask from "@/components/AddFileTask";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/features/taskSlice.js";
import ManyAnswersTask from "@/components/ManyAnswersTask";
import { getTeamInfo } from "@/redux/features/teamSlice.js";
import Loading from "@/components/Loading";
import { fetchTeamAnswer } from "@/redux/features/answersSlice";
import { message } from "antd";
import CountdownTimer from "@/components/CountdownTimer";
import { fetchHackathonById } from "@/redux/features/hackathonsSlice";
import style from "@/components/FeaturesPanel/style.module.scss";
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Helmet} from "react-helmet-async";
const TestPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [team, setTeam] = useState({});
  const [teamId, setTeamId] = useState(null);
  const [captain, setCaptain] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const { userInfo } = useSelector((state) => state.userStore);
  const { answers } = useSelector((state) => state.answersStore);
  const hackathon = useSelector((state) => state.hackathons?.hackathon);
  const { darkMode } = useSelector((state) => state.mode);

  const currentDate = new Date();
  const startDate = new Date(hackathon?.start);
  const endDate = new Date(hackathon?.end);
  const now = currentDate < startDate;


  let status;

  if (currentDate < startDate) {
    status = "Registration is open";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    status = "In progress";
  } else {
    status = "Finished";
  }


  useEffect(() => {
    if (userInfo.id && hackathon?.organizer_id) {
      const isEmployeeOrg = !!hackathon?.organizations.find(
          (hack) => hack.name === userInfo?.organization
      );
      if (
          userInfo?.id === hackathon?.organizer_id ||
          (hackathon?.organizations.length > 0 && !isEmployeeOrg) ||
          status !== 'In progress'
      ) {
        navigate("/hackathon");
      }
    }
  }, [navigate, userInfo, hackathon]);

  useEffect(() => {
    if (hackathon?.id) return;
    dispatch(fetchHackathonById(id));
  }, [dispatch, id, hackathon]);

  useEffect(() => {
    dispatch(getTeamInfo({ hackathonId: id, userId: userInfo.id }))
        .then((data) => {
          setTeam(data.payload);
        })
        .catch((error) => {
          console.error(
              "Error when receiving information about the team:",
              error
          );
        });
  }, [dispatch, id, userInfo.id]);

  useEffect(() => {
    if (team.teamUsers) {
      team.teamUsers.map((user) => {
        if (user.id === userInfo.id && user.isCaptain) {
          setCaptain(true);
        }
        setTeamId(team.team.id);
      });
    }
  }, [team, userInfo.id]);

  useEffect(() => {
    dispatch(fetchTasks(id));
    dispatch(fetchTeamAnswer({ hackathonId: id, teamId }));
  }, [dispatch, id, teamId]);

  if (!tasks || !userInfo?.id || !hackathon?.id) {
    return <Loading />;
  }

  const info = () => {
    message.success(t("TestPage.Answer saved correctly... maybe"));
  };

  const errorToast = () => {
    message.error(t("TestPage.Something went wrong ^_^"));
  };

  const totalPages = tasks.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSaveMany = async ({ answers, type, task }) => {
    const userAnswers = Object.entries(answers).reduce(
        (acc, [uuid, answer]) => {
          if (answer.checked) {
            acc[uuid] = { checked: answer.checked };
          }
          return acc;
        },
        {}
    );
    try {
      const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/answers/${task.id}/${type}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              userAnswers,
              taskId: task.id,
              type: "many-answers",
              hackathonId: task.hackathonId,
              teamId: team.team.id,
            }),
          }
      );

      if (res.status === 201) {
        info();
      } else {
        errorToast();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // TODO: вынести в отдельную функцию фетч или объединить, ориентируясь на тип задания
  const handleSaveInput = async ({ answers, type, task }) => {
    const userAnswers = answers;

    try {
      const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/answers/${task.id}/${type}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              userAnswers,
              taskId: task.id,
              type: "many-answers",
              hackathonId: task.hackathonId,
              teamId: team.team.id,
            }),
          }
      );
      if (res.status === 201) {
        info();
      } else {
        errorToast();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderContent = () => {
    if (currentPage > 0 && currentPage <= totalPages) {
      const task = tasks[currentPage - 1];
      const currentAnswer = answers.find((answer) => answer.taskId === task.id)
          ?.answer?.answer;
      const disabled = new Date(hackathon.end) < new Date();
      const getLanguage = (description) => {
        const match = description?.match(/language='(\w+)'/);
        return match ? match[1] : null;
      };
      const getHighlightedCode = (code) => {
        const codeStartIndex = code?.indexOf('>') + 1;
        const codeEndIndex = code?.lastIndexOf('<');
        return code?.slice(codeStartIndex, codeEndIndex);
      };
      const lang = getLanguage(task.description);
      const highlightedCode = getHighlightedCode(task.description);


      return (
          <div>
            <Helmet>
              <title>{hackathon?.name} | {task?.name} | Thothex.hackathon</title>
              <meta name='description' content={`${hackathon?.name} - about hackathon. ${hackathon?.description}`}/>
              <meta name="keywords" content={`${hackathon?.name}, описание хакатона`} />
            </Helmet>
            {task.type === "document" && (
                <>
                  <p className={styles.taskName}>{task.name}</p>
                  {task?.description?.includes(`<code language='${lang}'`) ? (
                      <>
                        {darkMode ? (
                            <SyntaxHighlighter language={lang} style={dracula} customStyle={{fontSize: '20px'}}>
                              {highlightedCode}
                            </SyntaxHighlighter>
                        ) : (
                            <SyntaxHighlighter language={lang} style={prism}
                                               customStyle={{fontSize: '20px', backgroundColor: 'white'}}>
                              {highlightedCode}
                            </SyntaxHighlighter>
                        )}
                      </>
                  ) : (
                      <p>{task.description}</p>
                  )}
                  {task?.link && <Link to={task.link} className={styles.linkContainer}>
                    <p className={styles.link}>Ссылка на ресурс</p>
                    <div className={styles.tooltip}>{task.link}</div>
                  </Link>}

                  {captain && (
                      <AddFileTask
                          task={task}
                          teamId={teamId}
                          showToast={info}
                          disabled={disabled}
                      />
                  )}
                </>
            )}
            {task.type === "input" && (
                <>
                  <p className={styles.taskName}>{task.name}</p>
                  {task.description?.includes("<code language=") ? (
                      <>
                        {darkMode ? (
                            <SyntaxHighlighter  language={lang} style={dracula} customStyle={{ fontSize: '20px'}}>
                              {highlightedCode}
                            </SyntaxHighlighter>
                        ) : (
                            <SyntaxHighlighter  language={lang} style={prism} customStyle={{ fontSize: '20px', backgroundColor:'white'  }}>
                              {highlightedCode}
                            </SyntaxHighlighter>
                        )}
                      </>

                  ) : (
                      <p>{task.description}</p>
                  )}
                  {task?.link && <Link to={task.link} className={styles.linkContainer}>
                    <p className={styles.link}>Ссылка на ресурс</p>
                    <div className={styles.tooltip}>{task.link}</div>
                  </Link>}

                  {captain && (
                      <InputTask
                          handleSaveInput={handleSaveInput}
                          type={"input"}
                          task={task}
                          savedValue={currentAnswer}
                          disabled={disabled}
                      />
                  )}
                </>
            )}
            {task.type === "many-answers" && (
                <>
                  <p className={styles.taskName}>{task.name}</p>
                  {task.description?.includes("<code language=") ? (
                      <>
                        {darkMode ? (
                            <SyntaxHighlighter language={lang} style={dracula} customStyle={{fontSize: '20px'}}>
                              {highlightedCode}
                            </SyntaxHighlighter>
                        ) : (
                            <SyntaxHighlighter language={lang} style={prism}
                                               customStyle={{fontSize: '20px', backgroundColor: 'white'}}>
                              {highlightedCode}
                            </SyntaxHighlighter>
                        )}
                      </>

                  ) : (
                      <p>{task.description}</p>
                  )}
                  {task?.link && <Link to={task.link} className={styles.linkContainer}>
                    <p className={styles.link}>Ссылка на ресурс</p>
                    <div className={styles.tooltip}>{task.link}</div>
                  </Link>}

                  <ManyAnswersTask
                      handleSaveMany={handleSaveMany}
                      type={"many-answers"}
                      task={task}
                      captain={captain}
                      teamId={teamId}
                      disabled={disabled}
                  />
                </>
            )}
          </div>
      );
    }
    return null;
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
          <li key={i} className={`${styles.pageItem} `}>
            <button
                className={`page-link} ${styles.pageLink} ${
                    currentPage === i ? `${styles.active}` : `${styles.unactive}`
                }`}
                onClick={() => handlePageChange(i)}
            ></button>
          </li>
      );
    }

    return pageNumbers;
  };
  return (
      <div className={`${styles.main} ${darkMode && styles.darkMain}`}>
        {hackathon?.end && (
            <div className={styles.countDownRow}>
              <CountdownTimer targetDate={hackathon.end} />
            </div>
        )}
        <nav aria-label="...">
          <ul className="pagination pagination-lg">{generatePageNumbers()}</ul>
        </nav>
        <div className={styles.taskContainer}>{renderContent()}</div>
        {tasks.length > 1 && (
            <div className={styles.BtnContainer}>
              <button className={styles.Btn} onClick={handlePreviousPage}>
                {"← "}
                {t("TestPage.PREVIOUS")}
              </button>
              <button className={styles.Btn} onClick={handleNextPage}>
                {t("TestPage.NEXT")}
                {" →"}
              </button>
            </div>
        )}
      </div>
  );
};

export default TestPage;
