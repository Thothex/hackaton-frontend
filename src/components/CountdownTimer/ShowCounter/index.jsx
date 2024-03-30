import DateTimeDisplay from '../DateTimeDisplay';
import styles from './styles.module.scss';

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={styles.showCounter}>
        <DateTimeDisplay value={days} type={'Days'} isDanger={days === 0 && hours < 3} />
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={days === 0 && hours < 3} />
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={days === 0 && hours < 3} />
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={days === 0 && hours < 3} />
    </div>
  );
};

export default ShowCounter