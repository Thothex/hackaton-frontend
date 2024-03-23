import { useEffect, useState } from 'react';
import { Table} from 'antd';
import CDropDown from '../CDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersThunk, updateUser } from '@/redux/features/usersSlice';

const AdminUserList = () => {
  const dispatch = useDispatch();
  
  const organizationList = useSelector((state) => state.dictionaryStore.dictionary.organizations);
  const organizationsForPicker = organizationList.map((org) => ({ id: org.id, value: org.name }));
  const userList = useSelector((state) => state.usersStore.users)
    

  // useEffect(() => {
  //   dispatch(fetchUsersThunk());
  // },[dispatch])

  const handleAddFromSelect = (item, userId) => {
    dispatch(updateUser({userId, organization: {id: item.id, name: item.value}}));
  }
  const users = userList.map((user) => { 
    console.log('user.organization', user.organization)
    const org = {
      id: user.organization.id,
      value: user.organization.name
    }
    return {
      key: user.userId,
      userId: user.userId,
      username: user.username,
      email: user.email,
      organization:
      <Organizations
        userId={user.userId}
        items={organizationsForPicker}
        value={org}
        handleAddFromSelect={handleAddFromSelect}
      />
    }
  })



  
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
    }
  ];

  
  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

const Organizations = ({ items, value, handleAddFromSelect, userId }) => {
  const [org, setOrg] = useState(value || {});
  const onChange = (name, item) => {
    handleAddFromSelect(item, userId)
    setOrg(item);
  }
  return (
    <CDropDown
      name='organization'
      items={items}
      onChange={onChange}
      value={org.value}
    />
  );
};

export default AdminUserList;