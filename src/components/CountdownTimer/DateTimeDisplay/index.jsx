import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  const mainCountdownClass = isDanger ? styles.danger : styles.countdown;
  return (
    <div className={mainCountdownClass}>
      <p className={styles.valueTitle}>{value || 0}</p>
      <span>{type}</span>
    </div>
  );
};

DateTimeDisplay.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string,
  isDanger: PropTypes.bool,
};

export default DateTimeDisplay;