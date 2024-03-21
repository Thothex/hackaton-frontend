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
        dispatch(fetchHackathons());
    }, [dispatch]);

    return (
        <div>
            <h1 className={styles.title}>HACKATHONS</h1>
            {user && (
                <div>{user.username}</div>
            )}
            <div className={styles.hackathonList}>
                {hackathons.map((hackathon) => (
                    <HackathonPanel
                        key={hackathon.id}
                        id={hackathon.id}
                        name={hackathon.name}
                        status={hackathon.status}
                        start={hackathon.start}
                        end={hackathon.end}
                        organizer_id={hackathon.organizer_id}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
