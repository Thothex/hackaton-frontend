import { useSelector } from "react-redux";
import { useState } from "react";
import ReactModal from "react-modal";
import styles from "./styles.module.scss";
import avatar from "@/assets/avatar.png";
import edit from "@/assets/edit.svg";
import close from "@/assets/close.svg";
import AddAvatar from "@/components/AddAvatar";

ReactModal.setAppElement("#root");

const ProfilePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.userStore);
  if (!userInfo) return <div>Loading...</div>;

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
      <div>My Hackathons</div>
    </div>
  );
};

export default ProfilePage;
