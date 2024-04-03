import style from "./style.module.scss";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Chart from "chart.js/auto";
import rank from "../../assets/profile/rank.svg";
import medal from "../../assets/profile/medal.svg";
import category from "../../assets/profile/category.svg";
import {
  fetchUserRankStatusThunk,
  userStatThunk,
} from "@/redux/features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
// import wizard from "../../assets/achievements/trophy.svg";
//
// const svgFiles = require.context('../../assets/achievements/', false, /\.svg$/);
//
// const svgPaths = svgFiles.keys().map(svgFiles);

const StatPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userStat } = useSelector((state) => state.userStore);
  const { userInfo } = useSelector((state) => state.userStore);
  const { userRankStatus } = useSelector((state) => state.userStore);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(userStatThunk());
    dispatch(fetchUserRankStatusThunk());
  }, [dispatch]);

  const categories = userStat?.categories || [];
  const userRank = userRankStatus?.rank || '';
  const amountOfHacks = userStat?.hack?.length || 0;
  const userScore = userInfo?.score;
  const leftScore = userStat?.nextRank;

  useEffect(() => {
    const ctx = document.getElementById("roundChart");
    const userS = userInfo?.score;
    const next = userStat?.nextRank;
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            `${t("ProfilePage.earned-points")}`,
            `${t("ProfilePage.remaining-points")}`,
          ],
          datasets: [
            {
              data: [userS, next],
              hoverOffset: 2,
              backgroundColor: ["rgba(151,171,223,0.8)", "white"],
              borderColor: "rgba(151,171,223,0.8)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          cutout: "70%",
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                  family: "Geologica",
                  color: "#2D3748",
                },
              },
              display: false,
            },
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            },
          },
        },
      });
    }
  }, [userInfo, userStat, t]);
  return (
    <div className={style.statPanel}>
      <div className={style.upperPanel}>
        <h2>{t("ProfilePage.achievements")}</h2>
        <div className={style.upperPanelContainer}>
          <div className={style.leftUpperPanel}>
            <img src={rank} alt="rank" />
            <div className={style.UpperInfo}>
              <h5>
                {t("ProfilePage.own-rank")}:
                {userRank === "wooden" && (
                  <p className={style.wooden}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
                {userRank === "iron" && (
                  <p className={style.iron}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
                {userRank === "bronze" && (
                  <p className={style.bronze}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
                {userRank === "silver" && (
                  <p className={style.silver}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
                {userRank === "gold" && (
                  <p className={style.gold}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
                {userRank === "platinum" && (
                  <p className={style.platinum}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
                {userRank === "diamond" && (
                  <p className={style.diamond}>
                    {t(`ProfilePage.ranks.${userRank}`)}
                  </p>
                )}
              </h5>
            </div>
          </div>
          <div className={style.centerUpperPanel}>
            <img src={category} alt="category" />
            <div className={style.UpperInfo}>
              <h5>
                {t("ProfilePage.popular-categories")}:
                <span className={style.categories}>
                  {categories?.map((cat) => (
                    <li key={cat.id}>
                      {t(`ProfilePage.categories.${cat.name.toLowerCase()}`)}
                    </li>
                  ))}
                </span>
              </h5>
            </div>
          </div>
          <div className={style.rightUpperPanel}>
            <img src={medal} alt="medal" />
            <div className={style.UpperInfo}>
              <h5>
                {t(`ProfilePage.overall-hackathons`)}:{" "}
                <span>{Number(amountOfHacks)}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className={style.lowePanel}>
        <div className={style.achiv}>
          <h3>About ranks</h3>
          <div className={style.aboutRank}>
            <p className={style.wooden}>{t(`ProfilePage.ranks.wooden`)}</p>
            <h5>
              {t(`ProfilePage.AboutRanks.from`)}{" "}
              <span style={{ fontWeight: 800 }}>
                {t(`ProfilePage.AboutRanks.0 to 100`)}
              </span>{" "}
              {t(
                `ProfilePage.AboutRanks.points. You re just in the beginning!`
              )}
            </h5>
          </div>
          <div className={style.aboutRank}>
            <p className={style.iron}>{t(`ProfilePage.ranks.iron`)}</p>
            <h5>
              {t(`ProfilePage.AboutRanks.from`)}{" "}
              <span style={{ fontWeight: 800 }}>
                {t(`ProfilePage.AboutRanks.100 to 300`)}
              </span>{" "}
              {t(
                `ProfilePage.AboutRanks.points. Feeling more confident in solving tasks.`
              )}
            </h5>
          </div>
          <div className={style.aboutRank}>
            <p className={style.bronze}>{t(`ProfilePage.ranks.bronze`)}</p>
            <h5>
              {t(`ProfilePage.AboutRanks.from`)}{" "}
              <span style={{ fontWeight: 800 }}>
                {t(`ProfilePage.AboutRanks.300 to 600`)}
              </span>{" "}
              {t(
                `ProfilePage.AboutRanks.points. Starting to make a name for yourself!`
              )}
            </h5>
          </div>
          <div className={style.aboutRank}>
            <p className={style.silver}>{t(`ProfilePage.ranks.silver`)}</p>
            <h5>
              {t(`ProfilePage.AboutRanks.from`)}{" "}
              <span style={{ fontWeight: 800 }}>
                {t(`ProfilePage.AboutRanks.600 to 1000`)}
              </span>{" "}
              {t(`ProfilePage.AboutRanks.points. Making significant progress!`)}
            </h5>
          </div>
          <div className={style.aboutRank}>
            <p className={style.gold}>{t(`ProfilePage.ranks.gold`)}</p>
            <h5>
              {t(`ProfilePage.AboutRanks.from`)}{" "}
              <span style={{ fontWeight: 800 }}>
                {t(`ProfilePage.AboutRanks.1000 to 1500`)}
              </span>{" "}
              {t(`ProfilePage.AboutRanks.points. Truly mastering your skills!`)}
            </h5>
          </div>

          <div className={style.aboutRank}>
            <p className={style.diamond}>{t(`ProfilePage.ranks.diamond`)}</p>
            <h5>
              {t(`ProfilePage.AboutRanks.from`)}{" "}
              <span style={{ fontWeight: 800 }}>
                {t(`ProfilePage.AboutRanks.2000 to infinity`)}
              </span>
              . {t(`ProfilePage.AboutRanks.You are a legend!`)}
            </h5>
          </div>
        </div>
        <div className={style.RoundStat}>
          <div className={style.roundInfoCont}>
            <div className={style.roundInfo}>
              <div className={style.squareLabel}></div>{" "}
              <h5>{t("ProfilePage.earned-points")}</h5>
            </div>
            <div className={style.roundInfo}>
              <div className={style.squareLabelAll}></div>{" "}
              <h5>{t("ProfilePage.remaining-points")}</h5>
            </div>
          </div>
          <canvas id="roundChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default StatPanel;
