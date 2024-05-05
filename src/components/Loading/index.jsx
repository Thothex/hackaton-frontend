import {ConfigProvider, Flex, Spin} from 'antd';
import styles from './styles.module.scss';

const Loading = () => {
  return (
    <div className={styles.spinWrapper}>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#8797c4",
                    backgroundColor: "#8797c4",
                    colorBgContainer: "white",
                    margin: "0",
                    colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
                    colorTextBase: "rgba(113, 128, 150, 1)",
                },
            }}
        >
      <Flex gap="small" vertical>
        <Spin tip="Loading..." size='large'></Spin>
      </Flex>
        </ConfigProvider>
    </div>
  );
};

export default Loading;