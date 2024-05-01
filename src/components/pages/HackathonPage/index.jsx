import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import categor from '../../../assets/hackathonPageIcons/categor.svg';
import organiz from '../../../assets/hackathonPageIcons/organiz.svg';
import teamPers from '../../../assets/hackathonPageIcons/teamPers.svg';
import prize from '../../../assets/hackathonPageIcons/prize.svg';
import './index.css';
import {
  fetchHackathonById,
  putHackathon,
} from "@/redux/features/hackathonsSlice.js";
import { Button, Flex } from "antd";
import styles from "./styles.module.scss";
import Loading from "@/components/Loading";
import screenfull from "screenfull";
import DashboardFloatingButton from "@/components/DashboardFloatingButton";
import Icons from "@/constants/icons";
import HackatonDate from "@/components/HackatonDate/index.jsx";

const HackathonPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userStore.userInfo);
  const { id } = useParams();
  const dispatch = useDispatch();

  const hackathon = useSelector((state) => state.hackathons.hackathon);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    dispatch(fetchHackathonById(id));
  }, [dispatch, id]);
  console.log(hackathon)
  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      if (!screenfull.isFullscreen) {
        screenfull.request(iframeRef.current);
      } else {
        screenfull.exit();
      }
      setIsFullscreen((prevState) => !prevState);
    }
  };

  if (!hackathon) {
    return <Loading />;
  }

  const isOrg = user.isOrg && user.id === hackathon.organizer_id;

  const isEmployeeOrg = !!hackathon?.organizations.find(
    (hack) => hack.name === user?.organization
  );

  const currentDate = new Date();
  const endDate = new Date(hackathon.end);
  const startDate = new Date(hackathon.start);

  const [level, organization] = hackathon.audience
    ? hackathon.audience.split(",")
    : ["", ""];
  let status;

  if (currentDate < startDate) {
    status = "Registration is open";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    status = "In progress";
  } else {
    status = "Finished";
  }

  const formattedStartDate = startDate.getDate();
  const startMonth = startDate.toLocaleString("en-US", { month: "long" });
  const formattedEndDate = endDate.getDate();
  const yearStart = startDate.getFullYear();
  const yearEnd = endDate.getFullYear();

  const endMonth = endDate.toLocaleString("en-US", { month: "long" });

  const handleEndHackathon = () => {
    dispatch(putHackathon({ ...hackathon, status: "Finished" }));
  };

  const handleStartHackathon = () => {
    if (user?.role) {
      navigate(`/hackathon/${hackathon.id}/start`);
    } else {
      navigate("/login");
    }
  };

  const currentLocation = window.location.origin;
  return (
    <div className={styles.hackathonPage}>
      <div
          className={`${styles.hackathonPanelUpper} ${
              status === "Registration is open"
                  ? styles.panelOpen
                  : status === "In progress"
                      ? styles.panelInProgress
                      : status === "Finished"
                          ? styles.panelClosed
                          : ""
          }`}
      >
        <div className={styles.upperHello}>
          <button onClick={() => navigate("/hackathon")}>
            <img
                className={styles.backArrow}
                src={Icons.BACK_ARROW}
                alt="back"
            />
          </button>
          <h4>{t(`HackathonPage.Welcome to the hackathon`)} 👋🏼</h4>
        </div>
        <div className={styles.hacUpperContainer}>
          <div className={styles.dataContainer}>
        <h1 className={styles.titleHac}>{hackathon.name}</h1>
        <div className={styles.statusCont}>
        <h3
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
        </h3>
        <h3 className={styles.area}>
          {t(`ProfilePage.categories.${hackathon.category.name.toLowerCase()}`)}
        </h3>
        <h3 className={styles.type}>
          {t(`HackathonPage.type.${hackathon.type.toLowerCase()}`)}
        </h3>
        </div>
          </div>
          <HackatonDate props={{ end: hackathon.end, start: hackathon.start }} />
        </div>
      </div>
      <div
          className={`${styles.panelContainer} ${
              status === "Registration is open"
                  ? styles.panelOpenContainer
                  : status === "In progress"
                      ? styles.panelInProgressContainer
                      : status === "Finished"
                          ? styles.panelClosedContainer
                          : ""
          }`}
      >
        <div className={styles.hackathonPanelSMall}>
          <div className={styles.icons}>
            <img src={organiz} alt='icon'/>
          </div>
          <Link to={`/organizations/${hackathon.organizer_id}`}>
          <div className={styles.infowrap}>
            <h3 className={styles.month}>{t(`HackathonPage.sponsor`)}</h3>
            <h3 className={styles.date}>
              {hackathon.organizer_name}

            </h3>
          </div>
          </Link>
        </div>

        <div className={styles.hackathonPanelSMall}>
          <div className={styles.icons}>
            <img src={categor} alt='icon'/>
          </div>
          <div className={styles.infowrap}>
            <h3 className={styles.month}>{t(`HackathonPage.category`)}</h3>
            <h3 className={styles.date}>
              {t(`HackathonPage.categories.${hackathon.category.name}`)}
            </h3>

          </div>
        </div>
        <div className={styles.hackathonPanelSMall}>
          <div className={styles.icons}>
            <img src={teamPers} alt='icon'/>
          </div>
          <div className={styles.infowrap}>
            <h3 className={styles.month}>{t(`HackathonPage.recommended_age`)}</h3>
            <h3 className={styles.date}>{t(`HackathonPage.${level}`)}</h3>

          </div>
        </div>
        <div className={styles.hackathonPanelSMall} id='prize'>
          <div className={styles.icons}>
            <img src={prize} alt='icon'/>
          </div>
          <div className={styles.infowrap}>
          <h3 className={styles.month} >{t(`HackathonPage.Prizes`)}</h3>
          <h3 className={styles.date}>
            {hackathon.prize} {t(`HackathonPage.points`)}
          </h3>

          </div>
        </div>

      </div>
      <div className={styles.hackathonPanelLower}>
        <div className={styles.description}>
          <h2>{t(`HackathonPage.About the hackathon`)}</h2>
          <p className={styles.descriptionHac}>{hackathon.description}</p>
        </div>
        <div className={styles.panelLowerRignt}>
          <div className={styles.organizationsList}>
            {hackathon.organizations.length >0 &&
                <ul>
                  <h3 className={styles.avialable}>Avaliable for participants from the following organizations:</h3>
                  {hackathon.organizations.map((org) => (
                      <div key={org.id} className={styles.hackathonPanelOrganization}>
                        {org.name}
                      </div>
                  ))}
          </ul>
            }
          </div>
        {status === "Registration is open" && user && (
          <div className={styles.pic} onClick={handleStartHackathon}>
            <button className={styles.takePartBTN}>
              {t(`HackathonPage.TAKE PART`)}
            </button>
          </div>
        )}
        {status === "In progress" &&
          user &&
          hackathon.organizer_id !== user.id &&
          (hackathon?.organizations.length === 0 || isEmployeeOrg) &&
          user.role && (
            <div className={styles.pic} onClick={handleStartHackathon}>
              <button className={styles.takePartBTN}>
                {t(`HackathonPage.TAKE PART`)}
              </button>
            </div>
          )}
        {status === "Registration is open" && !user?.role && (
          <div className={styles.pic}>
            <button className={styles.takePartBTN}>
              {t(`HackathonPage.SIGN IN/UP TO TAKE PART`)}
            </button>
          </div>
        )}
        {status === "In progress" && !user?.role && (
          <div className={styles.pic}>
            <button className={styles.takePartBTN}>
              {t(`HackathonPage.SIGN IN/UP TO TAKE PART`)}
            </button>
          </div>
        )}
        {status === "Finished" && (
          <div className={styles.pic}>
            <button
              disabled={status === "Finished"}
              className={styles.takePartBTN}
            >
              {t(`HackathonPage.Hackathon is over`)}
            </button>
          </div>
        )}
        </div>
      </div>

      {isOrg && (
        <>
          {hackathon.status !== "Finished" && (
            <Flex wrap="wrap" gap="small">
              <Button type="primary" danger onClick={handleEndHackathon}>
                {t(`HackathonPage.Hackathon end`)}
              </Button>
            </Flex>
          )}
        </>
      )}
      <DashboardFloatingButton onClick={toggleFullscreen} />
      <div className={styles.iframeWrapper}>
        <iframe
          ref={iframeRef}
          src={`${currentLocation}/dashboard?id=${id}`}
        />
      </div>
    </div>
  );
};

export default HackathonPage;
