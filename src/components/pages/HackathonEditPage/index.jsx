import NewHachathon from "@/components/NewHachathon";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tabs, ConfigProvider } from "antd";
import styles from "./styles.module.scss";
import HackathonTasksEdit from "@/components/HackathonTasksEdit";

const HackathonEditPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8797c4",
            backgroundColor: "#f5f7fa",
            colorBgContainer: "white",
            margin: "0",
            colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
            colorTextBase: "rgba(113, 128, 150, 1)",
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={[
            {
              label: `${t("HackathonEditPage.general-info")}`,
              key: "1",
              children: <NewHachathon id={id} />,
              className: styles.tabFile,
            },
            {
              label: `${t("HackathonEditPage.tasks-questions")}`,
              key: "2",
              children: <HackathonTasksEdit hackathonId={id} />,
              disabled: id ? false : true,
              className: styles.tabFile,
            },
          ]}
          className={styles.tabsContainer}
        ></Tabs>
      </ConfigProvider>
    </>
  );
};

export default HackathonEditPage;
