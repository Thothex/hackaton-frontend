import {useEffect, useState} from 'react';
import styles from './style.module.scss';
import InputTask from "@/components/InputTask";
import AddFileTask from "@/components/AddFileTask";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "@/redux/features/taskSlice.js";

const TestPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    console.log('tasks', tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

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
        switch (currentPage) {
            case 1:
                return <div><InputTask/></div>;
            case 2:
                return <div><AddFileTask/></div>;
            case 3:
                return <div>Содержимое для страницы 3</div>;
            default:
                return null;
        }
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
            <div className={styles.BtnContainer}>
            <button className={styles.Btn} onClick={handlePreviousPage}>{'<-'}PREVIOUS</button>
            <button className={styles.Btn} onClick={handleNextPage}>NEXT{'->'}</button>
            </div>
        </div>
    );
};

export default TestPage;
