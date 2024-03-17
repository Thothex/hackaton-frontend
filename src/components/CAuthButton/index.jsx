import styles from  './styles.module.scss';
const AuthButton = (props) => {
    const { buttonText } = props;

    return (
        <button className={styles.AuthButton}>
            {buttonText}
        </button>
    );
};
export default AuthButton;
