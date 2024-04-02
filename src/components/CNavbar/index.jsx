import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import logo from "../../assets/logoBig.svg";
import profile from "../../assets/profile.svg";
import fire from "../../assets/fire.svg";
import cap from "../../assets/cap.svg";
import signin from "../../assets/signin.svg";
import register from "../../assets/register.svg";
import question from "../../assets/question.svg";
import logout from "../../assets/logout.svg";
import darkLogo from "../../assets/darkLogo.svg";
import highscore from "../../assets/highscore.svg";

const Navbar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const { darkMode } = useSelector((state) => state.mode);
  const { userInfo } = useSelector((state) => state.userStore);
  return (
      <nav className={`${styles.navbar} ${darkMode && styles.dark}`}>
      <div className={styles.navbarContainer}>
        <Link to="/">
          {darkMode ? <img src={darkLogo} alt="logo" className={styles.logo}/> :
              <img src={logo} alt="logo" className={styles.logo} />
          }
        </Link>
        <hr />
        <div className={styles.navList}>
          {userInfo.role ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.unactive
                }
              >
                <img src={profile} alt="profile" className={styles.icon} />
                Profile
              </NavLink>
              {userInfo.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.unactive
                  }
                >
                  <img src={cap} alt="cap" className={styles.icon} />
                  Admin panel
                </NavLink>
              )}
              {userInfo.isOrg && (
                <NavLink
                  to="/newhackathon"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.unactive
                  }
                >
                  <img src={signin} alt="signin" className={styles.icon} />
                  Create Hackathon
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.unactive
                }
              >
                <img src={register} alt="register" className={styles.icon} />
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.unactive
                }
              >
                <img src={signin} alt="signin" className={styles.icon} />
                Sign In
              </NavLink>
            </>
          )}
          <NavLink
            to="/highscore"
            className={({ isActive }) =>
              isActive ? styles.active : styles.unactive
            }
          >
            <img src={highscore} alt="highscore" className={styles.icon} />
            Highscore
          </NavLink>
          <NavLink
            to="/hackathon"
            className={({ isActive }) =>
              isActive ? styles.active : styles.unactive
            }
          >
            <img src={fire} alt="fire" className={styles.icon} />
            Hackathons
          </NavLink>
          {userInfo.id && (
            <Link onClick={logoutHandler} className={styles.unactive}>
              <img src={logout} alt="logout" className={styles.icon} />
              Logout
            </Link>
          )}
        </div>
      </div>

      <div className={styles.questions}>
        <img src={question} alt="question" className={styles.icon} />
        <span className={styles.questionText}>Any questions?</span>
        <span className={styles.contactInfo}>
          If you have any questions, feel free to contact us at Telegram
        </span>
        <div className={styles.buttonContainer}>
          <button
            className={styles.questionsBtn}
            onClick={() => {
              window.location.href = "https://t.me/alinaluzanova";
            }}
          >
            CONTACT US
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
