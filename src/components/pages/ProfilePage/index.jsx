import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useLayoutEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";
import styles from "./styles.module.scss";
import avatar from "@/assets/avatar.png";
import edit from "@/assets/edit.svg";
import close from "@/assets/close.svg";
import AddAvatar from "@/components/AddAvatar";
import Calendar from "@/components/CCalendar";
import { useNavigate } from "react-router-dom";
import ProfileStat from "@/components/ProfileStat/index.jsx";
import FormUpdateUser from "@/components/FormUpdateUser";
import { userStatThunk } from "@/redux/features/userSlice.js";
import StatPanel from "@/components/StatPanel/index.jsx";
import Loading from "@/components/Loading";
import UserHackatons from "@/components/UserHackatons";
import {Helmet} from "react-helmet-async";

ReactModal.setAppElement("#root");

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false);
  const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { userInfo } = useSelector((state) => state.userStore);
  const { userStat } = useSelector((state) => state.userStore);
  const { darkMode } = useSelector((state) => state.mode);

  useLayoutEffect(() => {
    if(userInfo && (!userInfo.email || !userInfo.username)) {
      navigate('/register');
    }
  }, [userInfo]);



  useEffect(() => {
    dispatch(userStatThunk());
  }, [dispatch]);

  const openModal = () => {
    setModalAvatarIsOpen(true);
  };

  const closeModal = () => {
    setModalAvatarIsOpen(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
console.log(userInfo)
  if (!userInfo || !userStat) return <Loading />;


  return (
            <div className={`${styles.profilePage} ${darkMode && styles.darkPage}`}>
                <Helmet>
                  <title>Profile | Thothex.hackathon</title>
                  <meta name='description' content='Profile page'/>
                  <meta name="author" content="Alina Luzanova"/>
                  <meta name="keywords" content="профиль ползователя, список хакатонов, статистика, календарь событий" />
                </Helmet>
              <div className={styles.topPlain}>
                <div className={styles.hello}>
                  {t("ProfilePage.hello", {username: userInfo.username})} 👋🏼
                </div>
              </div>
              <div className={styles.avatarBox}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar}>
                    <img
                        src={
                          userInfo.avatar
                              ? `${import.meta.env.VITE_BASE_URL_AVATAR}/${userInfo.id}/${
                                  userInfo.avatar
                              }`
                              : avatar
                        }
                        className={styles.avatar}
                    />
                    <button className={styles.editAvatar} onClick={openModal}>
                      <img src={edit} alt="edit" className={styles.icon}/>
                    </button>
                    <ReactModal
                        className={styles.modal}
                        isOpen={modalAvatarIsOpen}
                        onRequestClose={closeModal}
                        shouldCloseOnOverlayClick={true}
                    >
                      <AddAvatar onCloseModal={closeModal}/>
                      <button onClick={closeModal} className={styles.close}>
                        <img src={close} alt="close" className={styles.icon}/>
                      </button>
                    </ReactModal>
                  </div>
                  <div className={styles.textWrapper}>
                    <div className={styles.name}>{userInfo.username}</div>
                    <div className={styles.email}>{userInfo.email}</div>
                  </div>
                </div>
              </div>
              <div className={styles.mainContainer}>
                <div className={styles.upperPanel}>
                  <div className={styles.profileInfo}>
                    <div className={styles.infoContainer}>
                      <div className={styles.infoUserEdit}>
                        <h4>{t("ProfilePage.profile_information")}</h4>
                        <button
                            onClick={() => setModalInfoIsOpen(true)}
                            className={styles.editInfo}
                        ></button>
                        <ReactModal
                            className={styles.modal}
                            isOpen={modalInfoIsOpen}
                            onRequestClose={closeModal}
                            shouldCloseOnOverlayClick={true}
                        >
                          <FormUpdateUser/>
                          <button
                              onClick={() => setModalInfoIsOpen(false)}
                              className={styles.close}
                          >
                            <img src={close} alt="close" className={styles.icon}/>
                          </button>
                        </ReactModal>
                      </div>
                      <hr className={styles.hr}/>
                      <h5>
                        {t("ProfilePage.username")}: <span>{userInfo.username}</span>
                      </h5>
                      <h5>
                        {t("ProfilePage.email")}: <span>{userInfo.email}</span>
                      </h5>
                      <h5>
                        {t("ProfilePage.organization")}:{" "}
                        <span>
                  {userInfo.organization ? userInfo.organization : `-`}
                </span>
                      </h5>
                    </div>
                  </div>
                  <div className={styles.progress}>
                    {Object.keys(userStat).length > 0 && (
                        <ProfileStat stat={userStat.participate}/>
                    )}
                  </div>
                  <div className={styles.calendar}>
                    <Calendar onDateChange={handleDateChange}/>
                  </div>
                  <div className={styles.toHackathons}>
                    <div className={styles.infoUserEdit}>
                      <h4>{t("ProfilePage.hackathons")}</h4>
                    </div>
                    <div className={styles.pic}></div>
                    <button
                        onClick={() => {
                          navigate("/hackathon");
                        }}
                        className={styles.viewBtn}
                    >
                      {t("ProfilePage.view-all")}
                    </button>
                  </div>
                </div>
                {userStat?.hack && <UserHackatons hack={userStat.hack} date={date}/>}
                <StatPanel/>
              </div>
            </div>
  );
};

export default ProfilePage;
