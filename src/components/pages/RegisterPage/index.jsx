import logo from '../../../assets/logo.svg'
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import {useNavigate} from "react-router-dom";
import styles from './styles.module.scss'
import axios from "axios";
import {useState} from "react";
const RegisterPage  = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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
          await axios.post('http://localhost:4000/login', formData);
            navigate('/login');
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
            <h1>Create an account</h1>
            <p>Welcome back! Please enter your details.</p>
            <form onSubmit={handleSubmit}>
                <AuthInput label='Username' inner='Enter your username' type='text' name='email' value={formData.username} onChange={handleInputChange} />
                <AuthInput label='Password' inner='Enter your password' type='password' name='password' value={formData.password} onChange={handleInputChange} />
                <AuthInput label='Confirm Password' inner='Confirm password' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
                <AuthButton buttonText="Sign up" />
            </form>
            <h5>Already have an account? <button onClick={() => handleNavigate("/login")}>Log in</button></h5>
        </div>
    )

}

export default RegisterPage;
