import { useEffect, useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import { Button } from 'antd';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { updateTask } from '@/redux/features/hackathonsSlice';
import PropTypes from 'prop-types';
import Loading from '@/components/Loading';

const ManyAnswerTask = ({ hackathonId, task }) => {
  
  const [answers, setAnswers] = useState(task.answers);
  const [taskText, setTaskText] = useState(task.name || '');
  const [taskDescription, setTaskDescription] = useState(task.description || '');
  const [taskScore, setTaskScore] = useState(task.maxScore);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setAnswers(task.answers)
  }, [task])
 

  const saveHander = () => {
    dispatch(updateTask({hackathonId, task: {...task, answers, maxScore: taskScore, name: taskText, description: taskDescription, type: 'document'}}))
  }

  if (!answers) return <Loading />;
  return (
    <div>
      <div>
        <TextArea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Task question here..."
          autoSize={{ minRows: 2, maxRows: 6, }}
        />
        <TextArea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description here..."
          autoSize={{ minRows: 2, maxRows: 6, }}
        />
        <Input
          classNames={styles.taskInput}
          value={taskScore}
          onChange={(e) => setTaskScore(+e.target.value)}
        />
      </div>
      <div className={styles.addNewAnswerBlock}>
        <Button onClick={saveHander}>Save</Button>
      </div>
    </div>
  );
};

ManyAnswerTask.propTypes = {
  hackathonId: PropTypes.string,
  task: PropTypes.shape({
    answers: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string,
    maxScore: PropTypes.number,
  }),
};
export default ManyAnswerTask;