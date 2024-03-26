import { useState } from "react";
import styles from "./styles.module.scss";
import CDropDown from "../CDropDown";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateThunk } from "@/redux/features/userSlice";

const FormUpdateUser = () => {
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
      <h2>Edit user details</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* TODO: нужна логика смены языка */}
        <CDropDown
          placeholder="Language"
          value="Choose"
          items={[
            { id: 1, value: "English" },
            { id: 2, value: "Русский" },
          ]}
          onChange={() => null}
          className={styles.label}
        />
      </div>
      <div className={styles.organizationInfo}>
        <span className={styles.title}>Organization</span>
        <div className={styles.tooltip}>
          <span>!</span>
          <span className={styles.text}>
            To make a change, contact your organization
          </span>
        </div>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      <button type="submit" className={styles.btnUpdate}>
        Update
      </button>
    </form>
  );
};

export default FormUpdateUser;
