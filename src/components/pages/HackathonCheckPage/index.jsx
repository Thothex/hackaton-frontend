import { useParams } from 'react-router-dom';
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
  // console.log(teams);
  return (
    <>
      sdf
    </>
  );
};

export default HackathonCheckPage;