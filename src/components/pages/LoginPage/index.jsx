import logo from '../../../assets/logo.svg'
import styles from './styles.module.scss'
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import Checkbox from "@/components/CCheckbox/index.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
const LoginPage = () => {
    const navigate = useNavigate();
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
    return(
        <div className={styles.main}>
            <img src={logo} alt='logo'/>
            <h1>Log into your account</h1>
            <p>Welcome back! Please enter your details.</p>
            <form onSubmit={handleSubmit}>
                <AuthInput label='Username' inner='Username your email' type='text' name='email' value={formData.username} onChange={handleInputChange} />
                <AuthInput label='Password' inner='Enter your password' type='password' name='password' value={formData.password} onChange={handleInputChange} />
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

export default LoginPage;
