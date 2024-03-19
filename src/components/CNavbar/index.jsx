import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import fire from "../../assets/fire.svg";
import cap from "../../assets/cap.svg";
import signin from "../../assets/signin.svg";
import register from "../../assets/register.svg";

// пока непонятно, какие пропсы будут (если будут), поэтому сделала примерно
const Navbar = ({ isAuthenticated = false, isAdmin = true }) => {
  return (
    <div>
      <nav className={styles.navbar}>
        <img src={logo} alt="logo" className={styles.logo} />
        <hr />
        <div className={styles.navList}>
          {isAuthenticated ? (
            isAdmin ? (
              <>
                <NavLink
                  to="/"
                  className={styles.navLink}
                  activeClassName="active"
                >
                  <img src={profile} alt="profile" className={styles.icon} />
                  Profile
                </NavLink>
                <NavLink to="/admin" className={styles.navLink}>
                  <img src={cap} alt="cap" className={styles.icon} />
                  Admin
                </NavLink>
              </>
            ) : (
              <NavLink to="/" className={styles.navLink}>
                Profile
              </NavLink>
            )
          ) : (
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
          )}
          <NavLink to="/hackathon" className={styles.navLink}>
            <img src={fire} alt="fire" className={styles.icon} />
            Hackathon
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
