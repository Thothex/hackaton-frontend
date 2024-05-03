import style from './styles.module.scss';
import {ConfigProvider, Tabs} from "antd";
import styles from "@/components/pages/HackathonEditPage/styles.module.scss";
import React, {Suspense} from "react";
import Loading from "@/components/Loading/index.jsx";
import {useTranslation} from "react-i18next";
const ManageOrganizations = React.lazy(() => import("./children/manageOrg.jsx"));
const CreateOrganizations = React.lazy(() => import("./children/createOrg.jsx"));
const MyOrganizations = React.lazy(() => import("./children/myOrg.jsx"));
const Admin = () =>{
    const { t } = useTranslation();

    return(
        <div className={style.mainPage}>
        {/*<h1>admin</h1>*/}

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
                            label: t(`OrgPage.manage`),
                            key: "1",
                            children: <Suspense fallback={<Loading/>}>
                                <ManageOrganizations />
                            </Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label:  t(`OrgPage.new`),
                            key: "2",
                            children:<Suspense fallback={<Loading/>}>
                                <CreateOrganizations />
                            </Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label:  t(`OrgPage.my`),
                            key: "3",
                            children:<Suspense fallback={<Loading/>}>
                                <MyOrganizations />
                            </Suspense>,
                            className: styles.tabFile,
                        },
                    ]}
                    className={styles.tabsContainer}
                ></Tabs>
            </ConfigProvider>

</div>
    )
}
export default Admin
