import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Progress, Tooltip } from "antd";
import styles from "./styles.module.scss";
import getHighscore from "@/api/highscore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HighscorePage = () => {
  const { t } = useTranslation();
  const [usersHithscore, setUsersHithscore] = useState(null);
  const { userInfo } = useSelector((state) => state.userStore);
  const [maxHighscores, setMaxHighscores] = useState({maxScore: 0, maxScoreOrg: 0})
  const navigate = useNavigate()
  useEffect(() => {
    const getUsersHighscore = async () => {
      try {
        const response = await getHighscore();
        if (!response.status === 403 || !response.error) {
          setUsersHithscore(response);
        } else {
          navigate('/login')
        }
      } catch (error) {
        return { error: "Failed to fetch highscore" };
      }
    };
    getUsersHighscore();
  }, [navigate]);
  console.log(usersHithscore);
  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  useEffect(() => {
    if (!usersHithscore) return
    setMaxHighscores({
      maxScore: usersHithscore?.highscore[0]?.score || 0,
      maxScoreOrg: usersHithscore?.organizationsHighscore[0]?.rating || 0
    })
  },[usersHithscore])

  return (
    <div className={styles.blocksWrapper}>
      <div className={styles.blockWidget}>
        <h1 className={styles.widgetTitle}>
          {t("HighscorePage.Users highscore")}
        </h1>
        {usersHithscore?.highscore &&
          usersHithscore?.highscore.map((user) => {
            const progress = (user.score * 100) / maxHighscores.maxScore;
            const isMe = user.id === userInfo.id;
            const disabled = user.username.length > 10;
            const usernameClass = isMe ? styles.usernameMe : styles.username;
            return (
              <div className={styles.userScore} key={user.id}>
                <div className={usernameClass}>
                  <Tooltip
                    placement="topLeft"
                    title={!disabled ? "" : user.username}
                    color="#2db7f5"
                  >
                    <h4>{user.username}</h4>
                  </Tooltip>
                </div>
                <Progress
                  className={styles.progress}
                  percent={progress}
                  strokeColor={twoColors}
                  size={[300, 30]}
                  format={() => ` ${user.score}`}
                />
              </div>
            );
          })}
      </div>

      {maxHighscores.maxScoreOrg && 
      <div className={styles.blockWidget}>
        <h1 className={styles.widgetTitle}>
          {t("HighscorePage.Organizations highscore")}
        </h1>
        {usersHithscore?.organizationsHighscore &&
          usersHithscore?.organizationsHighscore.map((org) => {
            const progress = (org.rating * 100) / maxHighscores.maxScoreOrg;
            const disabled = org.organization.length > 10;
            return (
              <div className={styles.userScore} key={org.id}>
                <div className={styles.username}>
                  <Tooltip
                    placement="topLeft"
                    title={!disabled ? "" : org.organization}
                    color="#2db7f5"
                  >
                    <h4>{org.organization}</h4>
                  </Tooltip>
                </div>
                <Progress
                  className={styles.progress}
                  percent={progress}
                  strokeColor={twoColors}
                  size={[300, 30]}
                  format={() => ` ${org.rating}`}
                />
              </div>
            );
          })}
      </div>
      }
    </div>
  );
};

export default HighscorePage;
