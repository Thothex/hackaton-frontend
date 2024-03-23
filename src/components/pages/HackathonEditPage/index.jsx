import NewHachathon from '@/components/NewHachathon';
import { useParams } from 'react-router-dom';
import { Tabs, ConfigProvider } from 'antd';
import styles from './styles.module.scss';
import HackathonTasksEdit from '@/components/HackathonTasksEdit';

const HackathonEditPage = () => {
  const { id } = useParams();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8797c4',
            backgroundColor: '#f5f7fa',
            colorBgContainer: 'white',
          },
        }}
      >
        <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Общая информация',
            key: '1',
            children: <NewHachathon id={id} />,
          },
          {
            label: 'Задания и вопросы',
            key: '2',
            children: <HackathonTasksEdit hackathonId={id} />,
            disabled: id ? false : true,
          }
          ]}
          tabBarStyle={{backgroundColor: 'none'}}
          className={styles}
        >
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default HackathonEditPage;