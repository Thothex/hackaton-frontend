import { useEffect, useState, useLayoutEffect } from "react";
import styles from "./style.module.scss";
import InputTask from "@/components/InputTask";
import AddFileTask from "@/components/AddFileTask";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/features/taskSlice.js";
import ManyAnswersTask from "@/components/ManyAnswersTask";
import { getTeamInfo } from "@/redux/features/teamSlice.js";

const TestPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [team, setTeam] = useState({});
  const [teamId, setTeamId] = useState(null);
  const [captain, setCaptain] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const { userInfo } = useSelector((state) => state.userStore);

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
  }, [dispatch, id]);

  if (!tasks) {
    return <div>Loading...</div>;
  }

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
      // TODO: обработать ответ? вывести тост?
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
      // TODO: обработать ответ? вывести тост?
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderContent = () => {
    if (currentPage > 0 && currentPage <= totalPages) {
      const task = tasks[currentPage - 1]; // Индексация с 0
      return (
        <div>
          {task.type === "document" && (
            <>
              <p>{task.name}</p>
              <p>{task.description}</p>
              {captain && <AddFileTask task={task} teamId={teamId} />}
            </>
          )}
          {task.type === "input" && (
            <>
              <p>{task.name}</p>
              {captain && (
                <InputTask
                  handleSaveInput={handleSaveInput}
                  type={"input"}
                  task={task}
                />
              )}
            </>
          )}
          {task.type === "many-answers" && (
            <>
              <p>{task.name}</p>
              <p>{task.description}</p>

              <ManyAnswersTask
                handleSaveMany={handleSaveMany}
                type={"many-answers"}
                task={task}
                captain={captain}
                teamId={teamId}
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
    <div className={styles.main}>
      <nav aria-label="...">
        <ul className="pagination pagination-lg">{generatePageNumbers()}</ul>
      </nav>
      <div className="mt-3">{renderContent()}</div>
      {tasks.length > 1 && (
        <div className={styles.BtnContainer}>
          <button className={styles.Btn} onClick={handlePreviousPage}>
            {"<-"}PREVIOUS
          </button>
          <button className={styles.Btn} onClick={handleNextPage}>
            NEXT{"->"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
