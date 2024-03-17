import './styles.module.scss';
const AuthButton = (props) => {
    const { buttonText } = props;

    return (
        <button>
            {buttonText}
        </button>
    );
};
export default AuthButton;
