import logo from "../../../../assets/logoBig.svg";
import styles from "../styles.module.scss";
import AuthButton from "../../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AuthHeader from "@/components/AuthHeader/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {recoverPasswordThunk} from "@/redux/features/recoverSlice";
import Loading from "@/components/Loading/index.jsx";

const EnterEmail = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [rememberCheckbox, setRememberCheckbox] = useState(false);
    const status = useSelector((state) => state.recover.status);
    console.log(status)
    const [message, setMessage] = useState({
        error:'',
        success:''
    });
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(recoverPasswordThunk(formData));
            console.log(res.status)
            if(res.payload.status >= 400){
                setMessage({ error: "You don't have an account", success: '' });
            } else{
                setMessage({ error:'',success: res.payload.message });
                console.log(res.payload)
            }
            console.log('succes')
        } catch (error) {
            setMessage({ error: "You don't have an account", success: '' });
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleChangeRemember = (checked) => {
        setRememberCheckbox(checked);
    };

    return (
        <div className={styles.AuthPage}>
            <AuthHeader />
            <div className={styles.main}>
                <img src={logo} alt="logo" />
                <h1>{t("Register-and-login-page.passwordRecover")}</h1>
                <p className={styles.loginParagraph}>
                    {t("Register-and-login-page.Enter your email")}
                </p>
                {status==='loading' && <Loading/>}
                {message.error && <p className={styles.error}>{message.error}</p>}
                {message.success && <p className={styles.success}>{message.success}</p>}
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <AuthInput
                        label={t("ProfilePage.email")}
                        inner={t("Register-and-login-page.Enter your email")}
                        type={"email"}
                        name={"email"}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <AuthButton buttonText={t("Register-and-login-page.Recover")} />
                </form>
                <h5>
                    {t("Register-and-login-page.Don't have an account?")}{" "}
                    <button
                        className={styles.linkButton}
                        onClick={() => handleNavigate("/register")}
                    >
                        {t("Register-and-login-page.Sign up")}
                    </button>
                </h5>
            </div>
        </div>
    );
};

export default EnterEmail;
