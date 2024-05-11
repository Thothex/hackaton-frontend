import { useTranslation } from "react-i18next";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import categor from '../../../assets/hackathonPageIcons/categor.svg';
import organiz from '../../../assets/hackathonPageIcons/organiz.svg';
import teamPers from '../../../assets/hackathonPageIcons/teamPers.svg';
import prize from '../../../assets/hackathonPageIcons/prize.svg';
import arrowBack from '../../../assets/arrowBack.svg'
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
import {createTeam, getTeamInfo} from "@/redux/features/teamSlice.js";
import LeaderBoard from "@/components/pages/StartHackathonPage/LeaderBoard/index.jsx";

const HackathonPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userStore.userInfo);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  const hackathon = useSelector((state) => state.hackathons.hackathon);
  const [newTeamId, setNewTeamId] = useState(null);
  const isOrg = hackathon?.users.map((user)=> user.id).includes(user?.id)




  useEffect(() => {
    dispatch(fetchHackathonById(id));
  }, [dispatch, id]);

  // const isOrg = useMemo(() => user.isOrg && user?.id === hackathon?.organizer_id, [user, hackathon]);
  const isEmployeeOrg = useMemo(() => !!hackathon?.organizations.find((hack) => hack.name === user?.organization), [hackathon, user]);


  const currentDate = useMemo(() => new Date(), []);
  const endDate = useMemo(() => new Date(hackathon?.end), [hackathon?.end]);
  const startDate = useMemo(() => new Date(hackathon?.start), [hackathon?.start]);


  const [level, organization] = hackathon?.audience
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

  const handleEndHackathon = useCallback(() => {
    dispatch(putHackathon({ ...hackathon, status: "Finished" }));
  }, [dispatch, hackathon]);


  const handleCreateTeam = useCallback(async () => {
    try {
      if(user?.role !== 'admin'){

      const {
        payload: { id: newTeamId },
      } = await dispatch(
          createTeam({
            name: teamName ? teamName : `${user?.username} - ${hackathon?.id}`,
            hackathonId: id,
          })
      );
      setNewTeamId(newTeamId);
      dispatch(getTeamInfo({ hackathonId: id, userId: user?.id }));
      return newTeamId;
      }
    } catch (error) {
      console.error("Failed to create team:", error);
    }

  }, [dispatch, hackathon?.id, id, teamName, user.username]);

  const createMetaTeam = useCallback(async () => {
    await handleCreateTeam(user.username);
  }, [handleCreateTeam, user.username]);

  const handleStartHackathon = useCallback(() => {
    if (user?.role) {
      if (hackathon?.type === 'person') {
        createMetaTeam();
        setTeamName(`${user?.username} - ${hackathon?.id}`);
      }
      navigate(`/hackathon/${hackathon?.id}/start`);
    } else {
      navigate("/login");
    }
  }, [createMetaTeam, hackathon?.id, hackathon?.type, navigate, user?.role, user.username]);


  if (!hackathon) {
    return <Loading />;
  }

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
        {/*<h3 className={styles.area}>*/}
        {/*  {t(`ProfilePage.categories.${hackathon.category.name.toLowerCase()}`)}*/}
        {/*</h3>*/}
        <h3 className={styles.type}>
          {t(`HackathonPage.type.${hackathon?.type.toLowerCase()}`)}
        </h3>
        </div>
          </div>
          <HackatonDate props={{ end: hackathon?.end, start: hackathon?.start }} />
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
          <Link to={`/organizations/${hackathon?.organizer_id}`}>
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
          {(isOrg || user?.role === 'admin') && (
              <>
                {status === "Finished" && (
                    <Flex wrap="wrap" gap="small" style={{marginTop:20}}>
                      <Button type="primary" danger onClick={handleEndHackathon}>
                        {t(`HackathonPage.Hackathon end`)}
                      </Button>
                    </Flex>
                )}
              </>
          )}
        </div>
        <div className={styles.panelLowerRignt}>
          {status !== 'Finished' && <div className={styles.organizationsList}>
            {hackathon.organizations.length >0 &&
                <ul>
                  <h3 className={styles.avialable}>{t("HackathonPage.availableFor")}</h3>
                  {hackathon.organizations.map((org) => (
                      <div key={org?.id} className={styles.hackathonPanelOrganization}>
                        {org.name}
                      </div>
                  ))}
                </ul>
            }
          </div>}

        {status === "Registration is open" && user.role ==='user' && (
          <div className={styles.pic} onClick={handleStartHackathon}>
            <button className={styles.takePartBTN}>
              {t(`HackathonPage.TAKE PART`)}
            </button>
          </div>
        )}
        {status === "In progress" &&
          user &&
          (hackathon?.organizations.length === 0 || isEmployeeOrg || user?.role === 'admin') &&
          user.role && (
            <div className={styles.pic} onClick={handleStartHackathon}>
              <button className={styles.takePartBTN}>
                {t(`HackathonPage.TAKE PART`)}
              </button>
            </div>
          )}
        {status === "Registration is open" && !user?.role && (
          <div className={styles.pic}>
            <button className={styles.takePartBTN} onClick={()=> navigate('/register')}>
              {t(`HackathonPage.SIGN IN/UP TO TAKE PART`)}
            </button>
          </div>
        )}
        {status === "In progress" && !user?.role && hackathon.type ==='person' && (
          <div className={styles.pic}>
            <button className={styles.takePartBTN} onClick={()=> navigate('/register')}>
              {t(`HackathonPage.SIGN IN/UP TO TAKE PART`)}
            </button>
          </div>
        )}
        {status === "Finished" && (
            <div className={styles.leader}>
          <div className={styles.pic}>
            <button
              disabled={status === "Finished"}
              className={styles.takePartBTN}
            >
              {t(`HackathonPage.isOver`)}
            </button>
          </div>
              <LeaderBoard hackathonId={hackathon.id}/>
      </div>
        )}
        </div>
      </div>

    </div>
  );
};

export default HackathonPage;
