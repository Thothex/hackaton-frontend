import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import useRandomPasswordGenerator from "@/hooks/useRandomPasswordGenerator.js";
import {deleteHackathon} from "@/redux/features/hackathonsSlice.js";

const HackathonPanel = React.memo((props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentDate = useMemo(() => new Date(), []);
  const endDate = useMemo(() => new Date(props.end), [props.end]);
  const startDate = useMemo(() => new Date(props.start), [props.start]);
  const { darkMode } = useSelector((state) => state.mode);
  const [isOrg, setIsOrg] = useState(false);
  const { userInfo } = useSelector((state) => state.userStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const generateRandomPassword = useRandomPasswordGenerator();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
const dispatch = useDispatch();
  useMemo(() => {
    if (props?.users) {
      const organizators = props?.users.map((item) => item?.email);
      if (organizators.includes(props.user.email)) {
        setIsOrg(true);
      }
    }
  }, [props.users, props.user.email]);

  const status = useMemo(() => {
    if (currentDate < startDate) {
      return "Registration is open";
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return "In progress";
    } else {
      return "Finished";
    }
  }, [currentDate, startDate, endDate]);

  const formattedStartDate = useMemo(() => startDate.getDate(), [startDate]);
  const startMonth = useMemo(
      () => startDate.toLocaleString("en-US", { month: "long" }),
      [startDate]
  );
  const formattedEndDate = useMemo(() => endDate.getDate(), [endDate]);
  const endMonth = useMemo(
      () => endDate.toLocaleString("en-US", { month: "long" }),
      [endDate]
  );
  const startYear = useMemo(() => startDate.getFullYear(), [startDate]);
  const endYear = useMemo(() => endDate.getFullYear(), [endDate]);

  const handleDeleteButtonClick = () => {
    const newPassword = generateRandomPassword(10);
    setGeneratedPassword(newPassword);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (verificationPassword === generatedPassword) {
      setIsModalOpen(false);
      setGeneratedPassword("");
      setVerificationPassword("");
      dispatch(deleteHackathon({id: props?.id}))
      console.log(' совпали')
    } else {
      console.log('не совпали')
      alert("The passwords do not match. Please try again.");
    }
  };

  return (
      <div
          className={`${styles.hackathonPanel} ${darkMode && styles.darkPanel} ${
              status === "Registration is open"
                  ? styles.panelOpen
                  : status === "In progress"
                      ? styles.panelInProgress
                      : status === "Finished"
                          ? styles.panelClosed
                          : ""
          }`}
      >
        <div className={styles.hackathonPanelHeader}>
          <div className={styles.hackathonPanelHeaderLeft}>
            <h3 className={styles.title}>{props.name}</h3>
            <div
                className={`${styles.status} ${
                    status === "Registration is open"
                        ? styles.registrationOpen
                        : status === "In progress"
                            ? styles.inProgress
                            : status === "Finished"
                                ? styles.finished
                                : ""
                }`}
            >
              {t(`HomePage.${status}`)}
            </div>
            <h3 className={styles.area}>
              {t(`ProfilePage.categories.${props.category.toLowerCase()}`)}
            </h3>
            <h3 className={styles.type}>
              {t(`HackathonPage.type.${props.type.toLowerCase()}`)}
            </h3>
          </div>
          <div className={styles.hackathonPanelHeaderRight}>
            <h4 className={styles.date}>{formattedStartDate}</h4>
            <p className={styles.month}>
              {t(`ProfilePage.months.${startMonth}`)}
              {" "}
              {startYear}
            </p>
            <hr />
            <h4 className={styles.date}>{formattedEndDate}</h4>
            <p className={styles.month}>
              {t(`ProfilePage.months.${endMonth}`)} {endYear}
            </p>
            <hr />
          </div>
        </div>
        <div className={styles.btnPanel}>
          <button
              className={`${styles.button} ${
                  status === "Registration is open"
                      ? styles.panelOpenButton
                      : status === "In progress"
                          ? styles.panelInProgressButton
                          : status === "Finished"
                              ? styles.panelClosedButton
                              : ""
              }`}
              onClick={() => {
                navigate(`/hackathon/${props.id}`);
              }}
          >
            {t(`HomePage.READ MORE`)}
          </button>
          {(isOrg || (userInfo && userInfo?.role === "admin")) && (
              <>
                <button
                    type="button"
                    onClick={() => navigate(`/hackathon/${props.id}/edit`)}
                    className={styles.button}
                >
                  {t(`HomePage.EDIT`)}
                </button>
                <button
                    type="button"
                    onClick={() => navigate(`/hackathon/${props.id}/check`)}
                    className={styles.button}
                >
                  {t(`HomePage.CHECK`)}
                </button>
                {userInfo?.role === "admin" && (
                    <button
                        type="button"
                        style={{ color: "#ff284e" }}
                        onClick={handleDeleteButtonClick}
                        className={styles.button}
                    >
                      DELETE
                    </button>
                )}
              </>
          )}
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Confirm Delete"
            className={styles.modal}
        >
          <h2>Confirmation</h2>
          <p className={styles.password}>Password:</p>
          <h4 className={styles.random}>{generatedPassword}</h4>
          <p>
            If you are sure you need to delete this hackathon, write this password
            in the field:
          </p>
          <input
              type="text"
              value={verificationPassword}
              onChange={(e) => setVerificationPassword(e.target.value)}
          />
          <div className={styles.modalButtons}>
            <button className={styles.cancelBTN} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className={styles.deleteBTN} onClick={handleDelete}>Delete</button>
          </div>
        </Modal>
      </div>
  );
});

HackathonPanel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  organizer_id: PropTypes.number,
  users: PropTypes.array,
  category: PropTypes.string.isRequired,
  user: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default HackathonPanel;
