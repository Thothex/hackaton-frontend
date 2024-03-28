import { fetchHackathonStat } from '@/redux/features/hackathonsSlice';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const HackathonDashboard = () => {
  const [searchParams] = useSearchParams();
  const chartEl = useRef(null);
  const hackathonId = searchParams.get('id');
  const [chartInstance, setChartInstance] = useState(null);
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

  useEffect(() => {
    if (stat.teams?.length > 0) {
      const ctx = chartEl.current;
      if (chartInstance) {
        chartInstance.destroy();
      }
      const teamNames = stat.teams.map(team => team.name);
      const backgroundColors = ['#3e95cd', '#8e5ea2', '#3cba9f', '#3e95cd', '#8e5ea2', '#3cba9f', '#3e95cd', '#8e5ea2', '#3cba9f'];
      const colors = backgroundColors.slice(0, stat.teams.length);
      const data = Array.from({ length: stat.tasks.length }, (_, index) => index + 1);
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: teamNames,
          datasets: [
            {
              label: "Tasks done",
              backgroundColor: colors,
              data: stat.teams.map(team => team.answers.length)
            }
          ]
        },
        options: {
          legend: { display: false },
          indexAxis: 'y',
          title: {
            display: true,
            text: 'Tasks done'
          },
          scales: {
            x: {
              type: 'linear',
              grace: 2,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              }
            }
          }
        }
      });
      setChartInstance(newChartInstance);
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [stat]);
  
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
      <div style={{ width: '500', height: '200' }}>
        <canvas  ref={chartEl}></canvas>
      </div>
    </div>
  );
};

export default HackathonDashboard;