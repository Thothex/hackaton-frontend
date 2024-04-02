import { useState } from "react";
import { Table } from "antd";
import CDropDown from "../CDropDown";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "antd";
import { updateUser } from "@/redux/features/usersSlice";
import styles from "./styles.module.scss";

const AdminUserList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const organizationList = useSelector(
    (state) => state.dictionaryStore.dictionary.organizations
  );
  const organizationsForPicker = organizationList.map((org) => ({
    id: org.id,
    value: org.name,
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
        <Checkbox
          checked={user.isOrg}
          onChange={(e) => onChangeIsOrg(e, user)}
        />
      ),
    };
  });

  const columns = [
    {
      title: "id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: `${t("ProfilePage.username")}`,
      dataIndex: "username",
      key: "username",
    },
    {
      title: `${t("ProfilePage.email")}`,
      dataIndex: "email",
      key: "email",
    },
    {
      title: `${t("ProfilePage.organization")}`,
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: `${t("AdminPage.organizer")}`,
      dataIndex: "isOrg",
      key: "isOrg",
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
