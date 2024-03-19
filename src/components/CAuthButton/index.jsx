
import './styles.module.scss';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'
const AuthButton = (props) => {
    const { buttonText } = props;

    return (
        <button className={styles.AuthButton} type='submit'>
            {buttonText}
        </button>
    );
};

AuthButton.propTypes = {
    buttonText: PropTypes.string.isRequired
};
export default AuthButton;
