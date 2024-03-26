import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState  } from 'react';
import { fetchTeamList } from '@/redux/features/teamsSlice';
import styles from './styles.module.scss';
import { fetchTasks } from '@/redux/features/taskSlice';
import { changeScore, fetchTeamAnswer, saveScores } from '@/redux/features/answersSlice';

const HackathonTeamPage = () => {
  const { id, teamId } = useParams();
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teamsStore);
  const { tasks } = useSelector((state)=> state.tasks)
  const { answers } = useSelector((state)=> state.answersStore)
  const [team, setTeam] = useState(null)
  useEffect(() => {
    setTeam(teams.find(team => team.id === +teamId))
  }, [teams, teamId]
  )
  useEffect(() => {
    if (!teams.length) {
      dispatch(fetchTeamList({ hackathonId: id }))
      dispatch(fetchTasks(id))
      
      dispatch(fetchTeamAnswer({ hackathonId:id, teamId }))
    }
  }, [dispatch, teams, id, teamId])
  
  const handleChangeScore = (e) => {
    e.preventDefault()
    const value = parseInt(e.target.value);
    if (value < 0 || value > e.target.max || isNaN(value)) {
      e.target.value = '';
    }
    const answerid = +e.target.dataset.answerid
    const score = +e.target.value
    dispatch(changeScore({answerid, score}))
  }

  const handleSaveScore = () => {
    dispatch(saveScores({answers}))
  }
  return (
    <>
      {team?.name}
      {tasks.map((task) =>
        <div key={task.id}>
          <h1>{task.name}</h1>
          <span>{task.description}</span>
          <div>Максимальное количество баллов: {task.maxScore}</div>
          <div >Ответ пользователя:</div>
            {answers.filter(ans => ans.taskId === task.id).map(item => ( 
                <div key={item.id} className={styles.userAnswerBlock}>
                  {
                    item.answer.fileUrl
                      ? <a href={`http://localhost:3000${item.answer.fileUrl}`} download="filename">download</a>
                      : <div>{item.answer.answer}</div>
                  }
              <div>
                <label>Введите оценку
                <input
                  data-answerid={item.id}
                  type="number"
                  min="0"
                  max={task.maxScore}
                  value={item.score || ''}
                  onChange={(e)=>handleChangeScore(e)}
                /></label>
              </div>
              </div>
              )
              )}
            
          
        </div>
      )}
      <button onClick={handleSaveScore} type='button'>Выставить оценку</button>
    </>
  );
};

export default HackathonTeamPage;