import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import dashboardIcon from '../../assets/dashboard.svg';


const DashboardFloatingButton = ({onClick}) => {
  return (
    <div className={styles.floatingWrapper}>
      <div onClick={onClick}>
      <img className={styles.icon} src={dashboardIcon} alt='dashboard' />
      </div>  
    </div>
  );
};

DashboardFloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DashboardFloatingButton;