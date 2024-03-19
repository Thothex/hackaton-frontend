import styles from './styles.module.scss';
import PropTypes from 'prop-types';
const MainButton = ({caption, onClick}) => {
  return (
    <button className={styles.btnContainer} onClick={onClick} type="button">{caption}</button>
  );
};

MainButton.propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func
}
export default MainButton;