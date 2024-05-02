import style from "./styles.module.scss";
import {ConfigProvider, Tabs} from "antd";
import React, {Suspense} from "react";
import Loading from "@/components/Loading/index.jsx";
import styles from "@/components/pages/HackathonEditPage/styles.module.scss";
import ManageOrganizations from "@/components/pages/OrganizationsPage/children/manageOrg.jsx";
import CreateOrganizations from "@/components/pages/OrganizationsPage/children/createOrg.jsx";
import MyOrganizations from "@/components/pages/OrganizationsPage/children/myOrg.jsx";
import MyOrganization from "@/components/pages/OrganizationsPage/children/myOrg.jsx";

const Org = () =>{
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
                            label: 'All organizations',
                            key: "1",
                            children: <Suspense fallback={<Loading/>}>
                                <ManageOrganizations />
                            </Suspense>,
                            className: styles.tabFile,
                        },
                        {
                            label: 'My organization',
                            key: "2",
                            children:<Suspense fallback={<Loading/>}>
                                <MyOrganization />
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
export default Org;
