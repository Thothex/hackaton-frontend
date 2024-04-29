import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOneOrganization } from "@/redux/features/organizationsSlice.js";
import { useParams } from "react-router-dom";
import avatar from "@/assets/avatar.png";
import styles from "./styles.module.scss";
import mockPic from "@/assets/avatar.png";
import OrganizationHackathons from "@/components/OrganizationHackathons/index.jsx";
import UserInfoTable from "@/components/pages/Organization/userInfoTable.jsx";

const Organization = () => {
    const { organization, users, hackathons, totalPeople } = useSelector((store) => store.organizations.organization);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userStore);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchOneOrganization(id))
    }, [id])
    return (
        <div className={styles.organization}>
            {organization && (
                <>
                    <p>{organization.name}</p>

                    <img
                        src={
                            organization.picture
                                ? `${import.meta.env.VITE_BASE_URL_ORG_PIC}/${organization.name}/${organization.picture}`
                                : avatar
                        }
                        className={styles.picture}
                        loading="lazy" // Добавляем lazy loading
                    />

                    <p>{organization.description}</p>
                    <p>{totalPeople}</p>
                    {hackathons?.length > 0 ? <OrganizationHackathons hack={hackathons} /> : <p>no hacks</p>}

                    {users && userInfo.isOrg && <UserInfoTable users={users} />}
                </>
            )}
        </div>
    );

}
// Organization.propTypes ={
//     name:PropTypes.string,
//     picture:PropTypes.string,
//     description:PropTypes.string,
//     totalPeople:PropTypes.number,
//     hackathons : PropTypes.array
// }
export default Organization
