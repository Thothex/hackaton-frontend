import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
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
import {userStatThunk} from "@/redux/features/userSlice.js";
ReactModal.setAppElement("#root");

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false);
  const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.userStore);
  const {userStat} = useSelector((state)=> state.userStore);

  useEffect(() => {
    dispatch(userStatThunk());
  }, [dispatch]);



  if (!userInfo) return <div>Loading...</div>;
  const openModal = () => {
    setModalAvatarIsOpen(true);
  };

  const closeModal = () => {
    setModalAvatarIsOpen(false);
  };

  return (
    <div>
      <div className={styles.topPlain}>
        <div className={styles.hello}>Hello, {userInfo.username} 👋🏼</div>
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
              <img src={edit} alt="edit" className={styles.icon} />
            </button>
            <ReactModal
              className={styles.modal}
              isOpen={modalAvatarIsOpen}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true}
            >
              <AddAvatar onCloseModal={closeModal} />
              <button onClick={closeModal} className={styles.close}>
                <img src={close} alt="close" className={styles.icon} />
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
                <h4>Profile information</h4>
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
                  <FormUpdateUser />
                  <button
                    onClick={() => setModalInfoIsOpen(false)}
                    className={styles.close}
                  >
                    <img src={close} alt="close" className={styles.icon} />
                  </button>
                </ReactModal>
              </div>
              <hr className={styles.hr} />
              <h5>
                Username: <span>{userInfo.username}</span>
              </h5>
              <h5>
                Email: <span>{userInfo.email}</span>
              </h5>
              {/*TODO настройка языка и организации*/}
              <h5>
                Language: <span>English</span>
              </h5>
              <h5>
                Organization:{" "}
                <span>
                  {userInfo.organization ? userInfo.organization : `-`}
                </span>
              </h5>
            </div>
          </div>
          <div className={styles.progress}>
            {Object.keys(userStat).length > 0 && (
                <ProfileStat stat={userStat.participate} />
            )}
          </div>
          <div className={styles.calendar}>
            <Calendar />
          </div>
          <div className={styles.toHackathons}>
            <div className={styles.infoUserEdit}>
              <h4>Hackathons</h4>
            </div>
            <div className={styles.pic}></div>
            <button
              onClick={() => {
                navigate("/hackathon");
              }}
              className={styles.viewBtn}
            >
              VIEW ALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
