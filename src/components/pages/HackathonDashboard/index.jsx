import { fetchHackathonStat } from '@/redux/features/hackathonsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const HackathonDashboard = () => {
  const [searchParams] = useSearchParams();
  const hackathonId = searchParams.get('id');
  const stat = useSelector((state) => state.hackathons.hackathonStat);
  const dispatch = useDispatch();
  console.log('id', hackathonId);
  useEffect(() => {
    dispatch(fetchHackathonStat({ hackathonId }));
  }, [dispatch, hackathonId]);
  console.log('stat', stat);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL);
    socket.onopen = () => {};
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log('event in dashboard', eventData)
      if (eventData?.code === 'dashboard_update' && +hackathonId === eventData?.hackathonId) {
        console.log('event code', event.data.code)
        console.log('МЫ ТОЧНО ДОЛЖНЫ ДЁРНУТЬ ДИСПАТЧ')
        dispatch(fetchHackathonStat({ hackathonId }));
      }
    };
    socket.onclose = () => {
        console.log('Connection closed');
    };
    socket.onerror = (error) => {
        console.error('Error:', error);
    };
    return () => {
        socket.close();
    };
  }, [dispatch, hackathonId]);
  
  return (
    <div>
      <div>
        <h1>Заголовок</h1>
        {stat?.teams && (stat.teams.map((team) => {
          const doneTasks = team.answers.length;
          return (
          <div key={team.id}>
            <h3>{team.name}</h3>
              <span>{doneTasks} из {stat.tasks.length}</span>
          </div>
          )
        })
      )}
      </div>

      <div>
        <h1>Набранные баллы</h1>
        {stat?.teams && (stat.teams.map((team) => {
          const currentScore = !team.answers.length ? 0 : team.answers.reduce((acc, answer) => acc + answer.score, 0);
          return (
          <div key={team.id}>
            <h3>{team.name}</h3>
              <span>{currentScore}</span>
          </div>
          )
        })
      )}
      </div>
    </div>
  );
};

export default HackathonDashboard;