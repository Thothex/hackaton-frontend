import AdminUserList from '@/components/AdminUserList';
import { Tabs } from 'antd';
import styles from './styles.module.scss';
const AdminPage = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
      {
        key: '1',
        label: 'Users',
        children: <AdminUserList />,
      }
    ];
 
  return (
  <div className={styles.adminContainer}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
)};

export default AdminPage;
