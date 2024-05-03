import style from "./styles.module.scss";
import {useTranslation} from "react-i18next";
import {ConfigProvider, Tabs} from "antd";
import React, {Suspense} from "react";
import Loading from "@/components/Loading/index.jsx";
import ManageOrganizations from "@/components/pages/OrganizationsPage/children/manageOrg.jsx";
import styles from "@/components/pages/HackathonEditPage/styles.module.scss";
import MyOrganization from "@/components/pages/OrganizationsPage/children/myOrg.jsx";

const User = () =>{
    const { t } = useTranslation();
    return(
        <div className={style.mainPage}>

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
                            label: t(`OrgPage.all`),
                            key: "1",
                            children: <Suspense fallback={<Loading/>}>
                                <ManageOrganizations />
                            </Suspense>,
                            className: styles.tabFile,
                        }
                    ]}
                    className={styles.tabsContainer}
                ></Tabs>
            </ConfigProvider>

        </div>
    )
}
export default User;
