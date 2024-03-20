import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHackathons } from '@/redux/features/hackathonsSlice.js';
import styles from './styles.module.scss';
import HackathonPanel from "@/components/HackathonPanel";

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userStore.userInfo);
    const hackathons = useSelector((state) => state.hackathons.hackathons);

    console.log('user', user);
    console.log('hackathons', hackathons);

    useEffect(() => {
        // Диспетчеризуем fetchHackathons при загрузке компонента
        dispatch(fetchHackathons());
    }, [dispatch]);

    return (
        <div>
            <h1>Home Page</h1>
            {user && (
                <div>{user.username}</div>
            )}
            <div className={styles.hackathonList}>
                {hackathons.map((hackathon) => (
                    <HackathonPanel
                        key={hackathon.id}
                        name={hackathon.name}
                        status={hackathon.status}
                        start={hackathon.start}
                        end={hackathon.end}
                        backgroundColor={hackathon.backgroundColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
