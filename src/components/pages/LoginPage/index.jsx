import logo from "../../../assets/logoBig.svg";
import styles from "./styles.module.scss";
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import CCheckbox from "../../CustomCheckbox/index.jsx";
import AuthHeader from "@/components/AuthHeader/index.jsx";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "@/redux/features/userSlice";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rememberCheckbox, setRememberCheckbox] = useState(false);
  const [error, setError] = useState('');
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
      const res = await dispatch(userLoginThunk(formData));
      if(res.payload.status >= 400){
        setError(res.payload.error)
      } else{
        navigate("/hackathon");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных", error);
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
        <h1>{t("Register-and-login-page.Log into your account")}</h1>
        <p className={styles.loginParagraph}>
          {t("Register-and-login-page.Welcome back! Please enter your details")}
          .
        </p>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <AuthInput
            label={t("ProfilePage.email")}
            inner={t("Register-and-login-page.Enter your email")}
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
          />
          <AuthInput
            label={t("Register-and-login-page.Password")}
            inner={t("Register-and-login-page.Enter your password")}
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleInputChange}
          />
           <div className={styles.checkboxContainer}>
            {/*<CCheckbox*/}
            {/*  label="Remember me"*/}
            {/*  checked={rememberCheckbox}*/}
            {/*  onChange={handleChangeRemember}*/}
            {/*/>*/}
             <span><Link to='/newPass'>Forgot password</Link></span>
          </div>
          <AuthButton buttonText={t("Register-and-login-page.Sign in")} />
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

export default LoginPage;
