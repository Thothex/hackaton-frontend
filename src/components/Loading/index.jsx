import { Alert, Flex, Spin } from 'antd';
import styles from './styles.module.scss';

const Loading = () => {
  return (
    <div className={styles.spinWrapper}>
      <Flex gap="small" vertical>
        <Spin tip="Loading..." size='large'></Spin>
      </Flex>
    </div>
  );
};

export default Loading;