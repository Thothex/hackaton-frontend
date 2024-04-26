import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import logo from "../../assets/logoBig.svg";
import profile from "../../assets/profile.svg";
import fire from "../../assets/fire.svg";
import cap from "../../assets/cap.svg";
import signin from "../../assets/signin.svg";
import register from "../../assets/register.svg";
import heart from "../../assets/white-heart.png"
import question from "../../assets/question.svg";
import logout from "../../assets/logout.svg";
import darkLogo from "../../assets/darkLogo.svg";
import highscore from "../../assets/highscore.svg";

const Navbar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const { t } = useTranslation();
  const { darkMode } = useSelector((state) => state.mode);
  const { userInfo } = useSelector((state) => state.userStore);
  return (
    <nav className={`${styles.navbar} ${darkMode && styles.dark}`}>
      <div className={styles.navbarContainer}>
        <Link to="/">
          {darkMode ? (
            <img src={darkLogo} alt="logo" className={styles.logo} />
          ) : (
            <img src={logo} alt="logo" className={styles.logo} />
          )}
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
                {t("Navbar.profile")}
              </NavLink>
              {userInfo.role === "admin" && (
                  <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.unactive
                  }
                >
                  <img src={cap} alt="cap" className={styles.icon} />
                  {t("Navbar.admin-panel")}
                </NavLink>
            </>
              )}
              {userInfo.isOrg && (
                <NavLink
                  to="/newhackathon"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.unactive
                  }
                >
                  <img src={signin} alt="signin" className={styles.icon} />
                  {t("Navbar.create-hackathon")}
                </NavLink>
              )}
              <NavLink
                to="/highscore"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.unactive
                }
              >
                <img src={highscore} alt="highscore" className={styles.icon} />
                {t("Navbar.highscore")}
              </NavLink>
              <NavLink
                  to="/organizations"
                  className={({ isActive }) =>
                      isActive ? styles.active : styles.unactive
                  }
              >
                <img src={cap} alt="cap" className={styles.icon} />
                {t("Navbar.orgs")}
              </NavLink>
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
                {t("Navbar.register")}
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.unactive
                }
              >
                <img src={signin} alt="signin" className={styles.icon} />
                {t("Navbar.sign-in")}
              </NavLink>
            </>
          )}
          <NavLink
            to="/hackathon"
            className={({ isActive }) =>
              isActive ? styles.active : styles.unactive
            }
          >
            <img src={fire} alt="fire" className={styles.icon} />
            {t("Navbar.hackathons")}
          </NavLink>
          <NavLink
              to="/about"
              className={({ isActive }) =>
                  isActive ? styles.active : styles.unactive
              }
          >
            <img src={heart} alt="fire" className={styles.icon} style={{borderRadius:'50%',width:30, height:30}} />
            {t("Navbar.about")}
          </NavLink>
          {userInfo.id && (
            <Link onClick={logoutHandler} className={styles.unactive}>
              <img src={logout} alt="logout" className={styles.icon} />
              {t("Navbar.logout")}
            </Link>
          )}
        </div>
      </div>

      <div className={styles.questions}>
        <img src={question} alt="question" className={styles.icon} />
        <span className={styles.questionText}>{t("Navbar.questions")}</span>
        <span className={styles.contactInfo}>
          {t("Navbar.have-any-questions")}
        </span>
        <div className={styles.buttonContainer}>
          <button
            className={styles.questionsBtn}
            onClick={() => {
              window.location.href = "https://t.me/alinaluzanova";
            }}
          >
            {t("Navbar.contact")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
