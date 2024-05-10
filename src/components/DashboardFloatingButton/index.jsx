import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import dashboardIcon from '../../assets/dashboard.svg';
import {useTranslation} from "react-i18next";


const DashboardFloatingButton = ({onClick}) => {
    const { t } = useTranslation();
    return (
    <div className={styles.floatingWrapper}>
      <div onClick={onClick}>
      {/*<img className={styles.icon} src={dashboardIcon} alt='dashboard' />*/}
          {t(`HomePage.fullScreen`)}
      </div>
    </div>
  );
};

DashboardFloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DashboardFloatingButton;
