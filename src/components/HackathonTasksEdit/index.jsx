import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Space, } from 'antd'
import { addNewTask, createNewTask } from '@/redux/features/hackathonsSlice';
import ManyAnswerTask from '../TaskVariants/ManyAnswerTask';
import { v4 as uuidv4 } from 'uuid';
import FileAnswerTask from '../TaskVariants/FileAnswerTask';

const HackathonTasksEdit = ({ hackathonId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.hackathons.currentHackathonTasks);

  const handleMenuClick = (e) => {
    if (e.key === '1') dispatch(createNewTask({ type: 'many-answers', maxScore: 10, answers: {}, hackathonId }))
    if (e.key === '2') dispatch(createNewTask({ type: 'file-upload', maxScore: 10, answers: {}, hackathonId }))
  };

  const items  = [
    {
      label: 'Multiple answers',
      key: '1',
    },
    {
      label: 'File upload',
      key: '2',
    },
  ];

  const menuProps = {
    items ,
    onClick: handleMenuClick,
  };

  

  return (
    <div>
      
      {
      tasks && tasks.map((task, index) => {
        return (
          <div key={index}>
            {task.type === 'many-answers' && <ManyAnswerTask hackathonId={hackathonId} task={task} />}
            {task.type === 'file-upload' && <FileAnswerTask hackathonId={hackathonId} task={task} />}
          </div>
        )
      })}
      <Dropdown menu={menuProps}>
        <Button><Space>Choose task type</Space></Button>
      </Dropdown>
    </div>
    
  );
};

export default HackathonTasksEdit;