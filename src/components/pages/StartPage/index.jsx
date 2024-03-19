import styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";
import book from '../../../assets/book.svg'
import code from '../../../assets/code.svg'
import bolt from '../../../assets/bolt.svg'
import data from '../../../assets/data.svg'
import logo from '../../../assets/logo.svg'
const StartPage = () =>{
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };
    return (
        <>
        <img src={logo} alt='logo' className={styles.logo} />
        <div className={styles.StartPage}>
            <h2 className={styles.Welcome}>Welcome to the World of</h2>
            <div className={styles.titleContainer}>
            <h1>ESSENTIAL</h1>
            <h1>SKILLS</h1>
        </div>
            <p className={styles.paragraph}>Join us on a unique educational competitions where</p>
                <p className={styles.paragraph}>curiosity is sparked, talents are nurtured, and futures are</p>
                    <p className={styles.paragraph}>shaped</p>
            <button onClick={() => { handleNavigate('/home') }} className={styles.button}>to Hackatons</button>
            <h3 className={styles.valTitle}>OUR VALUES</h3>
            <div className={styles.valuesContainer}>
                <div className={styles.values}>
                    <img src={book} alt='book' />
                    <h5>Education through science: try everything by yourself</h5>
                </div>
                <div className={styles.values}>
                    <img src={code} alt='code' />
                    <h5>Attracting the younger generation
                        to the programming and sciense
                    </h5>
                </div>
                <div className={styles.values}>
                    <img src={bolt} alt='bolt' />
                    <h5>Contribution to scientific and technological progress</h5>
                </div>
                <div className={styles.values}>
                    <img src={data} alt='data' />
                    <h5>Using data-driven approaches in development  planning</h5>
                </div>
            </div>

        </div>
        </>
    )
}
export default StartPage;
