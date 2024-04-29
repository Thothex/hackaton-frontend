import AdminUserList from "@/components/AdminUserList";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
const AdminPage = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.userStore);
  const navigate = useNavigate();

  const onChange = (key) => {
  };
  const items = [
    {
      key: "1",
      label: `${t("AdminPage.users")}`,
      children: <AdminUserList />,
    },
  ];
  if(userInfo.role ==='user'){
    navigate('/')
  }

  return (
    <div className={styles.adminContainer}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default AdminPage;
