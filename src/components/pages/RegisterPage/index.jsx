import logo from "../../../assets/logoBig.svg";
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import {useCallback, useEffect, useState} from "react";
import AuthHeader from "@/components/AuthHeader/index.jsx";
import { register } from "@/api/register";
import {useSelector} from "react-redux";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState({
    length:true,
    match:true,
    registerError:''
  })
  // const {userInfo} = useSelector((state)=> state.userInfo)
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

  const validatePassword = useCallback((password) => {
    const errors = [];

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    const hasNumber = /\d/.test(password);

    const hasNoSpaceOrPunctuation = /^[^\s!@#$%^&*()_+{}[\]:;'"|\\]+$/g.test(password);


    if (!hasLowerCase) {
      errors.push("Пароль должен содержать строчные буквы.");
    }
    if (!hasUpperCase) {
      errors.push("Пароль должен содержать заглавные буквы.");
    }
    if (!hasNumber) {
      errors.push("Пароль должен содержать цифры.");
    }
    if (!hasNoSpaceOrPunctuation) {
      errors.push("Пароль не должен содержать пробелы или знаки препинания.");
    }

    if (errors.length === 0) {
      return true;
    } else {
      return errors.join('');
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const pasValid = validatePassword(formData.password);
      if(pasValid !== true ){
        setError({
          ...error, length: true, match: true, registerError: pasValid
        })
      } else{
        if(formData.password.length <8) {
          setError({
            ...error, length: false, match: true
          })
        } else{
          const res = register(formData);
          res.then((data)=>
              {
                if (data.status === 201) {
                  navigate("/login");
                } else{
                  setError({
                    ...error, registerError: data.data.error, match: true, length: true
                  })
                }
              }
          )
        }
      }
    } else{
      setError({
        ...error, match: false, length: true, registerError: '',
      })
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
        {error.registerError.length > 0  && (
            <p className={styles.upperError}>
              {error.registerError.split('.').map((sentence, index) => (
                  <div key={index}>
                    <p>{sentence}</p>
                  </div>
              ))}
            </p>
        )}



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
          {!error.match && <p className={styles.lowerError}>{"Passwords don't match"}</p>}
          {!error.length && <p className={styles.lowerError}>{"Password must be longer than 8 symbols"}</p>}
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
