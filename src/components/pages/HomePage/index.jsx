import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHackathons } from '@/redux/features/hackathonsSlice.js';
import styles from './styles.module.scss';
import HackathonPanel from "@/components/HackathonPanel";
import { Select, Space } from 'antd';

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userStore.userInfo);
    const hackathons = useSelector((state) => state.hackathons.hackathons);
    const [currentFilter, setCurrentFilter] = useState('all');
    useEffect(() => {
        dispatch(fetchHackathons());
    }, [dispatch]);

    const handleFilterChange = (value) => {
        setCurrentFilter(value)
      };
    return (
        <div>
            <div className={styles.fullWidthFlexRow}>
                <h1 className={styles.title}>HACKATHONS</h1>
                <Select
                    defaultValue="all"
                    style={{ width: 120, }}
                    onChange={handleFilterChange}
                    options={[
                        { value: 'all', label: 'all', },
                        { value: 'my', label: 'my', }
                    ]}
                />
            </div>
            {user && (
                <div>{user.username}</div>
            )}
            <div className={styles.hackathonList}>
                {hackathons.filter((ha) =>{
                    if (currentFilter === 'all') {
                        return true;
                    }
                    return ha.organizer_id === user.id;
                }).map((hackathon) => (
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
