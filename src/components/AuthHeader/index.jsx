import styles from './styles.module.scss'
const AuthHeader = () =>{
    return(
        <div className={styles.authHeader}>
            <h2 className={styles.title}>Welcome to the Thothex.hackaton platform</h2>
            <p className={styles.paragraph}>Solve problems, become stronger and win!</p>
        </div>
    )
}
export default AuthHeader;
