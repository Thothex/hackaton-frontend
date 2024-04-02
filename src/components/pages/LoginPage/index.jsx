import logo from "../../../assets/logoBig.svg";
import styles from "./styles.module.scss";
import AuthButton from "../../CAuthButton/index.jsx";
import AuthInput from "@/components/CAuthInput/index.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CCheckbox from "../../CustomCheckbox/index.jsx";
import AuthHeader from "@/components/AuthHeader/index.jsx";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "@/redux/features/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [rememberCheckbox, setRememberCheckbox] = useState(false);
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
      res.payload.role === "admin" ? navigate("/admin") : navigate("/profile");
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
        <h1>Log into your account</h1>
        <p className={styles.loginParagraph}>
          Welcome back! Please enter your details.
        </p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <AuthInput
            label="Email"
            inner="Enter your email"
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
          />
          <AuthInput
            label="Password"
            inner={"Enter your password"}
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleInputChange}
          />
          {/* <div className={styles.checkboxContainer}>
            <CCheckbox
              label="Remember me"
              checked={rememberCheckbox}
              onChange={handleChangeRemember}
            />
            <span>Forgot password</span>
          </div> */}
          <AuthButton buttonText="Sign in" />
        </form>
        <h5>
          Don't have an account?{" "}
          <button
            className={styles.linkButton}
            onClick={() => handleNavigate("/register")}
          >
            Sign up
          </button>
        </h5>
      </div>
    </div>
  );
};

export default LoginPage;
