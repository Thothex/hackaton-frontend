import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchHackathonById } from '@/redux/features/hackathonsSlice.js';

const StartHackathonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const hackathon = useSelector(state => state.hackathons.hackathon);

    useEffect(() => {
        dispatch(fetchHackathonById(id));
    }, [dispatch, id]);

    if (!hackathon) {
        return <div>Loading...</div>;
    }

    const currentDate = new Date();
    //const endDate = new Date(hackathon.end);
    const startDate = new Date(hackathon.start);

    // Проверяем, начался ли хакатон
    if (currentDate < startDate) {
        return <div>Hackathon has not started yet. Please wait until it starts in {startDate.getDate()}.</div>;
    }


    const handleTasksClick = () => {
        navigate(`/hackathons/${id}/tasks`);
    };

    return (
        <div>
            <h1>{hackathon.name}</h1>
            <p>{hackathon.description}</p>
            <p>{hackathon.rules}</p>
            <p>{startDate.getDate()}</p>
            <button onClick={handleTasksClick}>Go to Tasks</button>
        </div>
    );
};

export default StartHackathonPage;
