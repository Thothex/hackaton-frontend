import AdminUserList from "@/components/AdminUserList";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
const AdminPage = () => {
  const { t } = useTranslation();
  const onChange = (key) => {
  };
  const items = [
    {
      key: "1",
      label: `${t("AdminPage.users")}`,
      children: <AdminUserList />,
    },
  ];

  return (
    <div className={styles.adminContainer}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default AdminPage;
