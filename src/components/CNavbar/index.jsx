import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import fire from "../../assets/fire.svg";
import cap from "../../assets/cap.svg";
import signin from "../../assets/signin.svg";
import register from "../../assets/register.svg";
import { useSelector } from "react-redux";

// пока непонятно, какие пропсы будут (если будут), поэтому сделала примерно
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userStore)
  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="logo" className={styles.logo} />
      <hr />
      <div className={styles.navList}>
        {userInfo.role
          ? <>
            <NavLink
              to="/"
              className={styles.navLink}
              activeclassname="active"
            >
              <img src={profile} alt="profile" className={styles.icon} />
              Profile
            </NavLink>
            <NavLink
              to="/newhackathon"
              className={styles.navLink}
              activeclassname="active"
            >
              <img src={profile} alt="profile" className={styles.icon} />
              Create Hackathon
            </NavLink>
              {userInfo.role === 'admin' && <NavLink to="/admin" className={styles.navLink}>
                <img src={cap} alt="cap" className={styles.icon} />
                Admin
              </NavLink>
              }
          </>
        :
          <>
            <NavLink to="/register" className={styles.navLink}>
              <img src={register} alt="register" className={styles.icon} />
              Register
            </NavLink>
            <NavLink to="/login" className={styles.navLink}>
              <img src={signin} alt="signin" className={styles.icon} />
              Sign In
            </NavLink>
          </>
        }
        <NavLink to="/hackathon" className={styles.navLink}>
          <img src={fire} alt="fire" className={styles.icon} />
          Hackathon
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
