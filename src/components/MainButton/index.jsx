import styles from './styles.module.scss';
import PropTypes from 'prop-types';
const MainButton = ({ caption, onClick, isDisabled = false }) => {
  const disabledClass = isDisabled ? styles.disabled : ''
  return (
    <button className={`${styles.btnContainer} ${disabledClass}`} disabled={isDisabled} onClick={onClick} type="button">{caption}</button>
  );
};

MainButton.propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
}
export default MainButton;