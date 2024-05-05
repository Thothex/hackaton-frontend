import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../../assets/logoBig.svg";
import AuthHeader from "@/components/AuthHeader/index.jsx";
import AuthButton from "../../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import { recoverPasswordEmailThunk } from "@/redux/features/recoverSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading/index.jsx";
import styles from "../styles.module.scss";

const RecoverPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { email, token } = useParams();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.recover.status);

    const [message, setMessage] = useState({
        error: "",
        success: "",
    });

    const [formData, setFormData] = useState({
        email: email,
        password: "",
        repeatPassword: "",
        token: token,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validatePassword = useCallback((password) => {
        const errors = [];

        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasNoSpaceOrPunctuation = /^[^\s!@#$%^&*()_+{}[\]:;'"|\\]+$/g.test(
            password
        );
        if(password.length <8){
            errors.push(t("Errors.symbols"));
        }
        if (!hasLowerCase) {
            errors.push(t("Errors.letA"));
        }
        if (!hasUpperCase) {
            errors.push(t("Errors.leta"));
        }
        if (!hasNumber) {
            errors.push(t("Errors.numbers"));
        }
        if (!hasNoSpaceOrPunctuation) {
            errors.push(t("Errors.space"));
        }

        if (errors.length === 0) {
            return true;
        } else {
            return errors.join("");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.repeatPassword) {
            const passwordValidationResult = validatePassword(formData.password);
            if (passwordValidationResult !== true) {
                setMessage({ error: passwordValidationResult, success: "" });
                return;
            }
            try {
                const res = await dispatch(recoverPasswordEmailThunk(formData));
                if (res.payload.status >= 400) {
                    setMessage({ error: t("Errors.noAcc"), success: "" });
                } else {
                    setMessage({ error: "", success: res.payload.message });
                }
            } catch (error) {
                setMessage({ error: t("Errors.noAcc"), success: "" });
            }
        } else {
            setMessage({ error: t("Errors.noMatch"), success: "" });
        }
    };

    useEffect(() => {
        if (message?.success) {
            const timeoutId = setTimeout(() => {
                navigate("/login");
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [message.success, navigate]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.AuthPage}>
            <AuthHeader />
            <div className={styles.main}>
                <img src={logo} alt="logo" />
                <h1>{t("Register-and-login-page.passwordRecover")}</h1>
                <p className={styles.loginParagraph}>
                    {t("Register-and-login-page.Enter your password")}
                </p>
                {status === "loading" && <Loading />}
                {message.error && message.error.split('.').map((sentence, index) => (
                    <div key={index}>
                        <p className={styles.error}>{sentence}</p>
                    </div>
                ))}
                {message.success && (
                    <p className={styles.success}>{message.success}</p>
                )}
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <AuthInput
                        label={t("Register-and-login-page.Password")}
                        inner={t("Register-and-login-page.Enter your password")}
                        type={"password"}
                        name={"password"}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <AuthInput
                        label={t("Register-and-login-page.Repeat Password")}
                        inner={t("Register-and-login-page.Confirm Password")}
                        type={"password"}
                        name={"repeatPassword"}
                        value={formData.repeatPassword}
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

export default RecoverPage;
