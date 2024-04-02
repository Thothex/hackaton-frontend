import logo from "../../../assets/logo.svg";
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState } from "react";
import AuthHeader from "@/components/AuthHeader/index.jsx";
import { register } from "@/api/register";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const res = register(formData);
      if (res) {
        navigate("/login");
      }
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.AuthPage}>
      <AuthHeader />
      <div className={styles.main}>
        <img src={logo} alt="logo" />
        <h1 className={styles.title}>
          {t("Register-and-login-page.Create an account")}
        </h1>
        <p className={styles.regParagraph}>
          {t("Register-and-login-page.Welcome! Please enter your details")}.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <AuthInput
            label={t("ProfilePage.email")}
            inner={t("Register-and-login-page.Enter your email")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <AuthInput
            label={t("ProfilePage.username")}
            inner={t("Register-and-login-page.Enter your username")}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <AuthInput
            label={t("Register-and-login-page.Password")}
            inner={t("Register-and-login-page.Enter your password")}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <AuthInput
            label={t("Register-and-login-page.Confirm Password")}
            inner={t("Register-and-login-page.Repeat Password")}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <AuthButton buttonText={t("Register-and-login-page.Get started")} />
        </form>
        <h5 className={styles.loginLink}>
          {t("Register-and-login-page.Already have an account?")}{" "}
          <button
            onClick={() => handleNavigate("/login")}
            className={styles.linkButton}
          >
            {t("Register-and-login-page.Log in")}
          </button>
        </h5>
      </div>
    </div>
  );
};

export default RegisterPage;
