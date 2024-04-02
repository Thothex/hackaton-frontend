import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTeamList } from "@/redux/features/teamsSlice";
import { Card } from "antd";

const HackathonCheckPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teams } = useSelector((state) => state.teamsStore);

  useEffect(() => {
    dispatch(fetchTeamList({ hackathonId: id }));
  }, [dispatch, id]);

  const handleClickTeam = (teamId) => {
    navigate(`/hackathon/${id}/check/${teamId}`);
  };
  return (
    <div className={styles.checkPageContainer}>
      {teams?.length > 0 &&
        teams.map((team) => (
          <Card
            key={team.id}
            title={team.name}
            bordered={false}
            className={styles.hackathonPanelSMall}
            style={{
              width: 300,
              cursor: "pointer",
            }}
            onClick={() => handleClickTeam(team.id)}
          >
            <span>{t("HackathonCheckPage.Participants")}:</span>
            {team.users.map((user) => (
              <div className={styles.teamItem} key={user.id}>
                {user.username}
              </div>
            ))}
          </Card>
        ))}
    </div>
  );
};

export default HackathonCheckPage;
