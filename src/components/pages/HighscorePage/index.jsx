import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Progress, Tooltip } from 'antd';
import styles from './styles.module.scss';
import getHighscore from '@/api/highscore';
import { useSelector } from 'react-redux';

const HighscorePage = () => {
  const [usersHithscore, setUsersHithscore] = useState(null);
  const { userInfo } = useSelector((state) => state.userStore);
  useEffect(() => {
    const getUsersHighscore = async () => {
      try {
        const response = await getHighscore();
        setUsersHithscore(response);
      } catch (error) {
        return { error: "Failed to fetch highscore" };
      }
    }
    getUsersHighscore();
  }, []);
  console.log(usersHithscore);
  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };
  const maxScore = usersHithscore?.highscore[0]?.score;
  
  return (
    <div className={styles.blocksWrapper}>
      <div className={styles.blockWidget}>
      <h1 className={styles.widgetTitle}>Users highscore</h1>
        {
          usersHithscore?.highscore && usersHithscore?.highscore.map((user) => {
            const progress = user.score * 100 / maxScore;
            const isMe = user.id === userInfo.id;
            const disabled = user.username.length > 10;
            const usernameClass = isMe ? styles.usernameMe : styles.username;
            return (
              <div className={styles.userScore}  key={user.id}>
                <div className={usernameClass}>
                <Tooltip placement="topLeft" title={!disabled ? '' : user.username} color='#2db7f5'>
                  <h4>{user.username}</h4>
                </Tooltip>
                </div>
                <Progress
                  className={styles.progress}
                  percent={progress}
                  strokeColor={twoColors}
                  size={[300, 30]}
                  format={() => ` ${user.score}`} />
              </div>
            )
          }) 
        }
      </div>

      
    </div>
  );
};

export default HighscorePage;