import {useEffect, useState} from 'react';
import styles from './style.module.scss';
import InputTask from "@/components/InputTask";
import AddFileTask from "@/components/AddFileTask";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "@/redux/features/taskSlice.js";
import ManyAnswersTask from '@/components/ManyAnswersTask';

const TestPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {id} = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    console.log('tasks', tasks);

    useEffect(() => {
        dispatch(fetchTasks(id));
    }, [dispatch, id]);

    console.log(tasks)
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

    const renderContent = () => {
        if (currentPage > 0 && currentPage <= totalPages) {
            const task = tasks[currentPage - 1]; // Индексация с 0
            return (
                <div>
                    {task.type === 'document' &&
                        <>
                        <p>{task.description}</p>
                        <AddFileTask task={task}/>
                        </>
                    }
                    {task.type === 'input' &&
                        <>
                            <p>{task.name}</p>
                            <InputTask task={task} />
                        </>
                    }
                    {task.type === 'many-answers' &&
                        <>
                            <p>{task.name}</p>
                            <p>{task.description}</p>
                        <ManyAnswersTask task={task} />
                        </>
                    }

                </div>
            );
        }
        return null;
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={`${styles.pageItem} `}
                >
                    <button className={`page-link} ${styles.pageLink} ${currentPage === i ? `${styles.active}` : `${styles.unactive}`}`} onClick={() => handlePageChange(i)}
                    >
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <div className={styles.main}>
            <nav aria-label="...">
                <ul className="pagination pagination-lg">
                    {generatePageNumbers()}
                </ul>
            </nav>
            <div className="mt-3">
                {renderContent()}
            </div>
            {tasks.length >1 &&  <div className={styles.BtnContainer}>
                <button className={styles.Btn} onClick={handlePreviousPage}>{'<-'}PREVIOUS</button>
                <button className={styles.Btn} onClick={handleNextPage}>NEXT{'->'}</button>
            </div>}
        </div>
    );
};

export default TestPage;
