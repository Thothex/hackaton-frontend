import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, {Suspense, useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { fetchHackathonById } from "@/redux/features/hackathonsSlice.js";
import styles from "./style.module.scss";
import {
  createTeam,
  getTeamInfo,
  sendInvite,
} from "@/redux/features/teamSlice.js";
import { getAllUsersThunk } from "@/redux/features/userSlice.js";
import InvintationBlock from "./InvintationBlock";
import Loading from "@/components/Loading";
import CountdownTimer from "@/components/CountdownTimer/index.jsx";
import Icons from "@/constants/icons";
import LeaderBoard from "@/components/pages/StartHackathonPage/LeaderBoard/index.jsx";
import DashboardFloatingButton from "@/components/DashboardFloatingButton/index.jsx";
import screenfull from "screenfull";
const LazyLeaderBoard = React.lazy(() => import("@/components/pages/StartHackathonPage/LeaderBoard/index.jsx"));

const StartHackathonPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const hackathon = useSelector((state) => state.hackathons.hackathon);
  const  teamInfo  = useSelector((state) => state.team.teamInfo);
  const { allUsers, userInfo: user } = useSelector((state) => state.userStore);
  const [teamName, setTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTeamId, setNewTeamId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasTeam = teamInfo?.team?.name
  const iframeRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  console.log('TEAM', teamInfo?.team?.name)

  const currentLocation = useMemo(() => window.location.origin, []);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHackathonById(id));
    dispatch(getAllUsersThunk());
    if (user?.id) {
      dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
        .then((data) => {
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL);
    socket.onopen = () => {};
    socket.onmessage = (event) => {
      const teamMessage = JSON.parse(event.data);
      if (+teamMessage.teamId === teamInfo.team.id) {
        dispatch(getTeamInfo({ hackathonId: id, userId: user.id }));
      }
    };
    socket.onclose = () => {
      console.log("Connection closed");
    };
    socket.onerror = (error) => {
      console.error("Error:", error);
    };
    return () => {
      socket.close();
    };
  }, [dispatch, id, teamInfo?.team?.id, user]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHackathonById(id));
    dispatch(getAllUsersThunk());
    if (user?.id) {
      dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
        .then((data) => {
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL);
    socket.onopen = () => {};
    socket.onmessage = (event) => {
      const teamMessage = JSON.parse(event.data);
      if (+teamMessage.teamId === teamInfo.team.id) {
        dispatch(getTeamInfo({ hackathonId: id, userId: user.id }));
      }
    };
    socket.onclose = () => {
      console.log("Connection closed");
    };
    socket.onerror = (error) => {
      console.error("Error:", error);
    };
    return () => {
      socket.close();
    };
  }, [dispatch, id, teamInfo?.team?.id, user]);

  const filteredUsers = allUsers
    ? allUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (user.id && hackathon?.organizer_id) {
      const isEmployeeOrg = !!hackathon?.organizations.find(
        (hack) => hack.name === user?.organization
      );
      // if(!teamInfo?.team){
      //   if (
      //       (hackathon?.organizations.length > 0 && !isEmployeeOrg) ||
      //       user?.role !== 'admin'
      //   ) {
      //     navigate("/hackathon");
      //   }
      // }
    }
  }, [navigate, user, hackathon]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInviteEmail(value);
    setSearchTerm(value.trim());
  };

  const handleUserClick = (email) => {
    setInviteEmail(email);
    setSearchTerm("");
  };


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


  const handleStart = async () => {
    handleTasksClick();
  };
  const handleSendInvite = async () => {
    try {
      await dispatch(
        sendInvite({
          teamId: teamInfo.team.id,
          member: inviteEmail,
          hackathonId: id,
        })
      );
      dispatch(getTeamInfo({ hackathonId: id, userId: user.id }));
      setInviteEmail("");
    } catch (error) {
      console.error("Failed to send invite:", error);
    }
  };

  const handleTasksClick = () => {
    navigate(`/hackathon/${id}/tasks`);
  };



  if (!hackathon || loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        {t("HackathonTeamPage.Error")}: {error}
      </div>
    );
  }

  const currentDate = new Date();
  const startDate = new Date(hackathon.start);
  const endDate = new Date(hackathon.end);
  const now = currentDate < startDate;
  if (currentDate > startDate) {
    // navigate(`/hackathon/${id}/tasks`);
    // return (
    //   <div>
    //     {t(
    //       "HackathonTeamPage.Hackathon has not started yet. Please wait until it starts on"
    //     )}{" "}
    //     {startDate.toDateString()}.
    //   </div>
    // );
  }
  let status;

  if (currentDate < startDate) {
    status = "Registration is open";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    status = "In progress";
  } else {
    status = "Finished";
  }
  const person = hackathon?.type === 'person';


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
          <button
            className={styles.button}
            onClick={() => navigate(`/hackathon/${hackathon.id}`)}
          >
          </button>
          <h4>{t("HackathonPage.Welcome to the hackathon")} 👋🏼</h4>
        </div>
        <div className={styles.timerName}>
          <h1 className={styles.titleHac}>{hackathon.name}</h1>
          {hackathon?.end && (
            <div className={styles.countDownRow}>
              <CountdownTimer targetDate={hackathon.end} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.hackathonPanelLower}>
        <div className={styles.about}>
          <div className={styles.description}>
            <h2>{t("HackathonTeamPage.Description")}</h2>
            <p>{hackathon.description}</p>
          </div>
          <div className={styles.rules}>
            <h2>{t("HackathonTeamPage.Rules of participation")}</h2>
            <p>{hackathon.rules}</p>
          </div>
          <div className={styles.toTaskCont}>
            {!now && (teamInfo?.teamUsers?.length > 0) && (
                <div className={styles.pic} onClick={handleStart}>
                  <button className={styles.takePartBTN}>
                   to tasks
                  </button>
                </div>
            )}
          </div>
        </div>
<div className={styles.lowercontainer}>
        <div className={styles.teamContainer}>
          <div className={styles.team}>
            {teamInfo?.team ? (
              // <h2>Your team is: {teamInfo.team.name}</h2>
              <></>
            ) : (
                now && hackathon.type === 'team' ? (
                    <div className={styles.createTeam}>
                      <h2>{t("HackathonTeamPage.Gather your team!")}
                      </h2>
                      <form onSubmit={handleCreateTeam}>
                        <input
                            placeholder={t("HackathonTeamPage.Name your team")}
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <button type="submit">{t("HackathonTeamPage.Save")}</button>
                      </form>
                    </div>
                ):(
                    <p className={styles.notAllow}>{t("HackathonTeamPage.notAllowed")}</p>
                )

            )}
            {teamInfo?.teamUsers?.length > 0? (
              <InvintationBlock
                styles={styles}
                teamInfo={teamInfo}
                handleSendInvite={handleSendInvite}
                handleInputChange={handleInputChange}
                inviteEmail={inviteEmail}
                searchTerm={searchTerm}
                filteredUsers={filteredUsers}
                handleUserClick={handleUserClick}
                now={now}
                person={person}
              />
            ):(
                <></>
            )}
          </div>
        </div>
  {(teamInfo?.teamUsers?.length > 0 || user?.role === 'admin') && !now && (
  <Suspense fallback={<Loading />}>
    <LazyLeaderBoard hackathonId={hackathon.id}/>
  </Suspense>
  )}
      </div>
      </div>
      {!now && <>
        <DashboardFloatingButton onClick={toggleFullscreen}/>
        <div className={styles.iframeWrapper}>
          <iframe
              ref={iframeRef}
              src={`${currentLocation}/dashboard?id=${id}`}
          />
        </div>
      </>}
    </div>
  );
};

export default StartHackathonPage;
