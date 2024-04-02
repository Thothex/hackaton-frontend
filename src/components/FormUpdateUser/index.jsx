import { useState } from "react";
import styles from "./styles.module.scss";
import CDropDown from "../CDropDown";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateThunk } from "@/redux/features/userSlice";
import { useTranslation } from "react-i18next";

const FormUpdateUser = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userStore);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });
    try {
      const response = await dispatch(
        userUpdateThunk({ id: userInfo.id, formData })
      );
      if (response.payload.error) {
        setError(response.payload.error);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{t("ProfilePage.edit-user-details")}</h2>
      <div>
        <label htmlFor="username">{t("ProfilePage.username")}</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">{t("ProfilePage.email")}</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.organizationInfo}>
        <span className={styles.title}>{t("ProfilePage.organization")}</span>
        <div className={styles.tooltip}>
          <span>!</span>
          <span className={styles.text}>
            {t("ProfilePage.change-organization")}
          </span>
        </div>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      <button type="submit" className={styles.btnUpdate}>
        {t("ProfilePage.save")}
      </button>
    </form>
  );
};

export default FormUpdateUser;
