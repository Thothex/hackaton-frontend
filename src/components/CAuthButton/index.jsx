import './styles.module.scss';
import PropTypes from 'prop-types';

const AuthButton = (props) => {
    const { buttonText } = props;

    return (
        <button type='submit'>
            {buttonText}
        </button>
    );
};

AuthButton.propTypes = {
    buttonText: PropTypes.string.isRequired
};
export default AuthButton;
