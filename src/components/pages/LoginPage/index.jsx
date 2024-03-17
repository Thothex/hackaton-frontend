import logo from '../../../assets/logo.svg'
import styles from './styles.module.scss'
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import Checkbox from "@/components/CCheckbox/index.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import CCheckbox from '../../CustomCheckbox/index.jsx';
import AuthHeader from "@/components/AuthHeader/index.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [rememberCheckbox, setRememberCheckbox] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', formData);
            navigate('/success');
        } catch (error) {
            console.error('Ошибка при отправке данных', error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleChangeRemember = (checked) => {
        setRememberCheckbox(checked)
    }
    return(
        <div className={styles.AuthPage}>
            <AuthHeader/>
        <div className={styles.main}>
            <img src={logo} alt='logo'/>
            <h1>Log into your account</h1>
            <p className={styles.loginParagraph}>Welcome back! Please enter your details.</p>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <AuthInput label='Username' inner='Enter your username' type='text' name='email' value={formData.username} onChange={handleInputChange} />
                <AuthInput label='Password' inner='Enter your password' type='password' name='password' value={formData.password} onChange={handleInputChange} />
                <div>
                    <div>
                        <CCheckbox label="Remember me" checked={rememberCheckbox} onChange={handleChangeRemember} />
                    </div>
                    <span>Forgot password</span>
                </div>
                <AuthButton buttonText="Sign in" />
            </form>
            <h5>Don't have an account? <button className={styles.linkButton} onClick={() => handleNavigate("/register")}>Sign up</button></h5>
        </div>
        </div>
    )

}

export default LoginPage;
