import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useMemo} from "react";
import { fetchOneOrganization } from "@/redux/features/organizationsSlice.js";
import {Link, useParams} from "react-router-dom";
import avatar from "@/assets/avatar.png";
import styles from "./styles.module.scss";
import mockPic from "@/assets/avatar.png";
import OrganizationHackathons from "@/components/OrganizationHackathons/index.jsx";
import UserInfoTable from "@/components/pages/Organization/userInfoTable.jsx";
import Loading from "@/components/Loading/index.jsx";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";

const Organization = () => {
    const { organization, users, hackathons, totalPeople } = useSelector((store) => store.organizations.organization);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userStore);
    const { id } = useParams();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(fetchOneOrganization(id))
    }, [id])
    const orgArr = useMemo(() => {
        return users?.filter((user) => user.isOrg === true).map((user) => user?.email);
    }, [users]);

    console.log( users , 768676876767)

    if(!organization){
        return <Loading/>
    }
    return (
        <div className={styles.organization}>
            <Helmet>
                <title>Organizations | {organization?.name} | Thothex.hackathon</title>
                <meta name='description' content={`${organization?.name} - All hackathons. ${organization?.description}`}/>
                <meta name="keywords" content={`${organization?.name}, описание организации`} />
            </Helmet>
            <div className={styles.upperPanel}>
                {organization?.link ? (
                    <Link to={organization?.link}><h1 className={styles.title}>{organization.name}</h1></Link>
                ) : (<h1 className={styles.title}>{organization.name}</h1>)}

                <img
                    src={
                            organization.picture
                                ? `${import.meta.env.VITE_BASE_URL_ORG_PIC}/${organization.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, '')}/${organization.picture}`
                                : avatar
                        }
                        className={styles.picture}
                        loading="lazy"
                    />
        </div>
            <div className={styles.about}>
                <h2>{t(`OrgPage.About`)}</h2>
                <div className={styles.aboutContainer}>
                <p>{organization.description}</p>
            </div>
            </div>

            {hackathons?.length > 0 ? <OrganizationHackathons hack={hackathons} /> : <p className={styles.noHack}>{organization.name} {t(`OrgPage.no hack`)}</p>}

                    {users && (userInfo.role === 'admin' || orgArr.includes(userInfo?.email)) && <UserInfoTable users={users} />}

        </div>
    );

}

export default Organization
