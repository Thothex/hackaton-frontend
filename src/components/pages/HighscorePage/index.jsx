import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {Progress, Tooltip, Table, ConfigProvider} from "antd";
import styles from "./styles.module.scss";
import getHighscore from "@/api/highscore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HighscorePage = () => {
  const { t } = useTranslation();
  const [usersHithscore, setUsersHithscore] = useState(null);
  const { userInfo } = useSelector((state) => state.userStore);
  const [maxHighscores, setMaxHighscores] = useState({
    maxScore: 0,
    maxScoreOrg: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getUsersHighscore = async () => {
      try {
        const response = await getHighscore();
        if (!response.status === 403 || !response.error) {
          setUsersHithscore(response);
        } else {
          navigate("/login");
        }
      } catch (error) {
        return { error: "Failed to fetch highscore" };
      }
    };
    getUsersHighscore();
  }, [navigate]);
  const twoColors = {
    "0%": "#eaeef9",
    "100%": "#8797c4",
  };
  useEffect(() => {
    if (!usersHithscore) return;
    setMaxHighscores({
      maxScore: usersHithscore?.highscore[0]?.score || 0,
      maxScoreOrg: usersHithscore?.organizationsHighscore[0]?.rating || 0,
    });
  }, [usersHithscore]);

  const columns = [
    {
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
          <Tooltip
              align={{
                offset: [0, 0],
                overflow: { adjustX: true, adjustY: true },
                targetOffset: [0, 0],
              }}
              title={record.username.length > 10 ? record.username : ""}
              color="#8797c4"
          >
            <h4 className={record.isMe ? styles.usernameMe : styles.username}>
              {text}
            </h4>
          </Tooltip>
      ),
    },
    {
      title: "",
      dataIndex: "progress",
      key: "progress",
      render: (text, record) => (
          <Progress
              percent={(record.score * 100) / maxHighscores.maxScore}
              strokeColor={twoColors}
              size={[300, 30]}
              format={() => ` ${record.score}`}
          />
      ),
    },
  ];

  const data = usersHithscore?.highscore?.map((user) => ({
    key: user.id,
    username: user.username,
    score: user.score,
    isMe: user.id === userInfo.id,
  }));

  return (
      <div className={styles.blocksWrapper}>
     <h1 style={{margin:0, padding:0}}>{t("HighscorePage.Users highscore")}</h1>
        <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#8797c4",
                backgroundColor: "#f5f7fa",
                colorBgContainer: "white",
                margin: "0",
                colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
                colorTextBase: "rgba(113, 128, 150, 1)",
                fontFamily:'Geologica',
                width:'100%',
                borderRadius:20,
                border:'none'
              },
            }}
        >
        <Table columns={columns} dataSource={data}
               style={{width:'100%'}}
               pagination={false} />
        </ConfigProvider>
        {!!maxHighscores.maxScoreOrg && (
            <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#8797c4",
                    backgroundColor: "#f5f7fa",
                    colorBgContainer: "white",
                    margin: "0",
                    colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
                    colorTextBase: "rgba(113, 128, 150, 1)",
                    fontFamily:'Geologica',
                    width:'100%',
                    borderRadius:20,
                    border:'none'
                  },
                }}
            >
            <Table
                columns={columns}
                dataSource={usersHithscore?.organizationsHighscore}
                pagination={false}
            />
            </ConfigProvider>
        )}
      </div>
  );
};

export default HighscorePage;
