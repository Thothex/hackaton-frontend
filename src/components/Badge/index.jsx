import styles from './styles.module.scss';
import PropTypes from 'prop-types';
const Badge = ({name, onDelete}) => {
  return (
    <div className={styles.badge}>
      <span className={styles.badgeSpan}>{name}</span>
      <svg onClick={onDelete} className={styles.badgeCross} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.99998 8.99998L5.00001 5.00001M5.00001 5.00001L1 1M5.00001 5.00001L9.00002 1M5.00001 5.00001L1 9.00002" stroke="#9D1010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func
}

export default Badge;