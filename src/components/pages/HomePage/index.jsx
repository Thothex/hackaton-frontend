import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchHackathons } from "@/redux/features/hackathonsSlice.js";
import styles from "./styles.module.scss";
import HackathonPanel from "@/components/HackathonPanel";
import { Select, Space } from "antd";

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userStore.userInfo);
  const hackathons = useSelector((state) => state.hackathons.hackathons);
  const [currentFilter, setCurrentFilter] = useState("all");
  const { darkMode } = useSelector((state) => state.mode);
  useEffect(() => {
    dispatch(fetchHackathons());
  }, [dispatch]);

  const handleFilterChange = (value) => {
    setCurrentFilter(value);
  };
  return (
    <div className={styles.homeContainer}>
      <div
        className={`${styles.fullWidthFlexRow} ${darkMode && styles.darkPage}`}
      >
        <h1 className={styles.title}>{t("HomePage.HACKATHONS")}</h1>
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={handleFilterChange}
          options={[
            { value: "all", label: `${t("HomePage.all")}` },
            { value: "my", label: `${t("HomePage.my")}` },
            { value: "inProgress", label: `${t("HomePage.in progress")}` },
            { value: "past", label: `${t("HomePage.past")}` },
            {
              value: "registrationIsOpen",
              label: `${t("HomePage.registration")}`,
            },
          ]}
        />
      </div>
      <div className={styles.hackathonList}>
        {hackathons
          .filter((ha) => {
            const currentDate = new Date();
            if (currentFilter === "all") {
              return true;
            }
            if (ha.organizer_id === user.id && currentFilter === "my") {
              return true;
            }
            if (
              new Date(ha.start) <= currentDate &&
              new Date(ha.end) >= currentDate &&
              currentFilter === "inProgress"
            ) {
              return true;
            }
            if (new Date(ha.end) < currentDate && currentFilter === "past") {
              return true;
            }
            if (
              new Date(ha.start) > currentDate &&
              currentFilter === "registrationIsOpen"
            ) {
              return true;
            }
          })
          .map((hackathon) => (
            <HackathonPanel
              key={hackathon.id}
              id={hackathon.id}
              name={hackathon.name}
              start={hackathon.start}
              end={hackathon.end}
              organizer_id={hackathon.organizer_id}
              user={user}
              category={hackathon.category.name}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
