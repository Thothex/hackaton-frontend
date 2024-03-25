import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeamList } from '@/redux/features/teamsSlice';

const HackathonCheckPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { teams } = useSelector((state) => state.teamsStore);
  
  useEffect(() => {
    dispatch(fetchTeamList({ hackathonId: id }));
  }, [dispatch, id]);
  return (
    <>
      {teams?.length > 0
        && teams.map((team) => (
          <Link to={`/hackathon/${id}/check/${team.id}`} key={team.id} className={styles.teamItem}>{team.name}</Link>
        ))
      }
    </>
  );
};

export default HackathonCheckPage;