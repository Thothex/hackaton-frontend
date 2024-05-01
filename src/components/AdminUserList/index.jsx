import { useState } from "react";
import { Table } from "antd";
import CDropDown from "../CDropDown";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "antd";
import { updateUser } from "@/redux/features/usersSlice";
import styles from "./styles.module.scss";
import InfoTooltip from "@/components/InfoTooltip/index.jsx";

const AdminUserList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const organizationList = useSelector(
      (state) => state.organizations.organizations
  );
  const organizationsForPicker = organizationList.map((org) => ({
    id: org.id,
    value: org.name,
    displayValue: org.name,
  }));
  const userList = useSelector((state) => state.usersStore.users);

  const handleAddFromSelect = (item, userId) => {
    dispatch(
        updateUser({ userId, organization: { id: item.id, name: item.value } })
    );
  };

  const onChangeIsOrg = (e, user) => {
    dispatch(updateUser({ userId: user.userId, isOrg: e.target.checked }));
  };

  const users = userList.map((user) => {
    const org = {
      id: user?.organization?.id,
      value: user?.organization?.name,
    };
    return {
      key: user.userId,
      userId: user.userId,
      username: user.username,
      email: user.email,
      organization: (
          <Organizations
              userId={user.userId}
              items={organizationsForPicker}
              value={org}
              handleAddFromSelect={handleAddFromSelect}
          />
      ),
      isOrg: (
          user.organization ? // Check if an organization is selected for the user
              <Checkbox
                  checked={user.isOrg}
                  onChange={(e) => onChangeIsOrg(e, user)}
              /> : <div className={styles.infoCheck}><Checkbox disabled /> <InfoTooltip text='to make user organizer, choose organization'/></div> // Render a disabled checkbox if no organization is selected
      ),
    };
  });

  const columns = [
    {
      title: "id",
      dataIndex: "userId",
      key: "userId",
      align: 'center',
    },
    {
      title: `${t("ProfilePage.username")}`,
      dataIndex: "username",
      key: "username",
      align: 'center',
    },
    {
      title: `${t("ProfilePage.email")}`,
      dataIndex: "email",
      key: "email",
      align: 'center',
    },
    {
      title: `${t("ProfilePage.organization")}`,
      dataIndex: "organization",
      key: "organization",
      align: 'center',
    },
    {
      title: `${t("AdminPage.organizer")}`,
      dataIndex: "isOrg",
      key: "isOrg",
      align: 'center',
    },
  ];

  return (
      <div>
        <Table className={styles.table} dataSource={users} columns={columns} />
      </div>
  );
};

const Organizations = ({ items, value, handleAddFromSelect, userId }) => {
  const [org, setOrg] = useState(value || {});
  const onChange = (name, item) => {
    handleAddFromSelect(item, userId);
    setOrg(item);
  };
  return (
      <CDropDown
          name="organization"
          items={items}
          onChange={onChange}
          placeholder={""}
          value={org.value}
      />
  );
};

export default AdminUserList;
