import { useSelector } from "react-redux";
import { useState } from "react";
import ReactModal from "react-modal";
import styles from "./styles.module.scss";
import avatar from "@/assets/avatar.png";
import edit from "@/assets/edit.svg";
import close from "@/assets/close.svg";
import AddAvatar from "@/components/AddAvatar";
import Calendar from "@/components/CCalendar";
import {useNavigate} from "react-router-dom";
import ProfileStat from "@/components/ProfileStat/index.jsx";
ReactModal.setAppElement("#root");



const ProfilePage = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.userStore);
  if (!userInfo) return <div>Loading...</div>;
console.log(userInfo)
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
                  ? `${import.meta.env.VITE_BASE_URL_AVATAR}/${userInfo.avatar}`
                  : avatar
              }
              className={styles.avatar}
            />
            <button className={styles.edit} onClick={openModal}>
              <img src={edit} alt="edit" className={styles.icon} />
            </button>
            <ReactModal
              className={styles.modal}
              isOpen={modalIsOpen}
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
                <button></button>
            </div>
              <hr className={styles.hr} />
              <h5>Username: <span>{userInfo.username}</span></h5>
              <h5>Email: <span>{userInfo.email}</span></h5>
              {/*TODO настройка языка и организации*/}
              <h5>Language: <span>English</span></h5>
              <h5>Organization: <span>-</span></h5>
            </div>
          </div>
          <div className={styles.progress}>
            <ProfileStat/>
          </div>
          <div className={styles.calendar}>
            <Calendar/>
          </div>
          <div className={styles.toHackathons}>
            <div className={styles.infoUserEdit}>
              <h4>Hackathons</h4>
            </div>
            <div className={styles.pic}></div>
            <button onClick={()=>{ navigate('/hackathon')}} className={styles.viewBtn}>VIEW ALL</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
