import { useEffect, useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import { Checkbox } from 'antd';
import { Button } from 'antd';
import styles from './styles.module.scss';
import { v4 as uuidv4 } from 'uuid';
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
  
  const onChangeRightAnswer = (e, uuid) => {
    const { checked } = e.target;
    setAnswers({
      ...answers,
      [uuid]: {
        ...answers[uuid],
        isRight: checked
      }
    })
  };
  const answerEditHandler = (e) => {
    const { value, dataset } = e.target;
    const { uuid } = dataset;
    setAnswers({
      ...answers,
      [uuid]: {
        ...answers[uuid],
        text: value
      }
    })
  }

  const addAnaserVariantHander = () => {
    const newId = uuidv4()
    setAnswers({
      ...answers,
      [newId]: { text: '', isRight: false }
    })
  }

  const removeAnswerVariant = (uuid) => {
    const newAnswers = { ...answers };
    delete newAnswers[uuid];
    setAnswers(newAnswers);
  }

  const saveHander = () => {
    dispatch(updateTask({hackathonId, task: {...task, answers, maxScore: taskScore, name: taskText, description: taskDescription, type: 'many-answers'}}))
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
      {
        Object.keys(answers).map((uuid) => {
          return (
            <div className={styles.answerInputBlock} key={uuid}>
              <Input
                onChange={answerEditHandler}
                classNames={styles.taskInput}
                value={answers[uuid].text}
                placeholder="Test variant here"
                data-uuid={uuid}
              />
              <Checkbox
                className={styles.checkboxLabelRight}
                onChange={(e) => onChangeRightAnswer(e, uuid)}
                checked={answers[uuid].isRight}
              >
                <div className={styles.checkboxLabelRight}>Right answer</div>
              </Checkbox>
              <Button danger onClick={()=>removeAnswerVariant(uuid)}>Delete</Button>
            </div>
          )
        })
      }
      <div className={styles.addNewAnswerBlock}>
        <Button onClick={addAnaserVariantHander}>Add answer variant</Button>
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