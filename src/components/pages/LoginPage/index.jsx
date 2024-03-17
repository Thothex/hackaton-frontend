import logo from '../../../assets/logo.svg'
import styles from './styles.module.scss'
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import Checkbox from "@/components/CCheckbox/index.jsx";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    }
    return(
        <div className={styles.main}>
            <img src={logo} alt='logo'/>
            <h1>Log into your account</h1>
            <p>Welcome back! Please enter your details.</p>
            <form>
                <AuthInput label='Email'  inner='Enter your email' type='text'/>
                <AuthInput label='Password'  inner='Enter your password' type='password' />
                <div>
                    <div>
                        <Checkbox id="box" />
                        <label htmlFor="box">Remember me</label>
                    </div>
                    <span>Forgot password</span>
                </div>
                <AuthButton buttonText="Sign in" />
            </form>
            <h5>Don't have an account? <button onClick={() => handleNavigate("/register")}>Sign up</button></h5>
        </div>
    )

}

export default Login;
