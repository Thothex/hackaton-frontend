import Organization from "@/components/pages/Organization/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {fetchOneOrganization, fetchOrgOrganizations} from "@/redux/features/organizationsSlice.js";
import Loading from "@/components/Loading/index.jsx";
import styles from "@/components/pages/Organization/styles.module.scss";
import style from '../styles.module.scss'
import avatar from "@/assets/avatar.png";
import OrganizationHackathons from "@/components/OrganizationHackathons/index.jsx";
import UserInfoTable from "@/components/pages/Organization/userInfoTable.jsx";
import ReactModal from "react-modal";
import close from "@/assets/close.svg";
import {t} from "i18next";
import FormEditOrganization from "@/components/pages/OrganizationsPage/editDelete/edit.jsx";
import {useTranslation} from "react-i18next";

const MyOrganization = ()=>{
    const { organization, users, hackathons, totalPeople } = useSelector((store) => store.organizations.organizations);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userStore);
    const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false);
    const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false);
    const [loadingTime, setLoadingTime] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingTime((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [loadingTime]);

    useEffect(() => {
        dispatch(fetchOrgOrganizations(userInfo?.id))
    }, [userInfo?.id])
    const orgArr = useMemo(() => {
        return users?.filter((user) => user.isOrg === true).map((user) => user?.email);
    }, [users]);


    const closeModal = () => {
        setModalAvatarIsOpen(false);
    };

    if (!organization) {
        if (loadingTime > 10) {
            return <p>You have no organization</p>;
        } else {
            return <Loading />;
        }
    }
    return (
        <div className={styles.organization}>
            <div className={styles.upperPanel}>
                <div style={{display:'flex'}}>
                {organization?.link ? (
                    <Link to={organization?.link}><h1 className={styles.title}>{organization.name}</h1></Link>
                ) : (<h1 className={styles.title}>{organization.name}</h1>)}
                <div className={styles.infoUserEdit}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <button
                            onClick={() => setModalInfoIsOpen(true)}
                            className={styles.editInfo}
                        ></button>
                    </div>
                    <ReactModal
                        className={styles.modal}
                        isOpen={modalInfoIsOpen}
                        onRequestClose={closeModal}
                        shouldCloseOnOverlayClick={true}
                    >
                        <FormEditOrganization name={organization.name} description={organization.description}
                                              link={organization?.link} id={organization.id} userID={userInfo.id}/>
                        <button
                            onClick={() => setModalInfoIsOpen(false)}
                            className={styles.close}
                        >
                            <img src={close} alt="close" className={styles.icon}/>
                        </button>
                    </ReactModal>
                </div>
                </div>
                <img
                    src={
                        organization.picture
                            ? `${import.meta.env.VITE_BASE_URL_ORG_PIC}/${organization.name}/${organization.picture}`
                            : avatar
                    }
                    className={styles.picture}
                    loading="lazy"
                />
            </div>
            <div className={styles.about}>
                <h2>{t(`OrgPage.About`)}</h2>
                <div className={styles.aboutContainer}>
                    <p style={{fontSize:'16px'}}>{organization.description}</p>
                </div>
            </div>

            {hackathons?.length > 0 ? <OrganizationHackathons hack={hackathons}/> : <p>no hacks</p>}

            {users && (userInfo.role === 'admin' || orgArr.includes(userInfo?.email)) && <UserInfoTable users={users}/>}
        </div>
    );

}
export default MyOrganization
