import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchOneOrganization} from "@/redux/features/organizationsSlice.js";
import { useParams} from "react-router-dom";
import avatar from "@/assets/avatar.png";
import styles from "./styles.module.scss";
import mockPic from "@/assets/avatar.png";

const Organization =()=>{
    const {organization, hackathons, totalPeople} = useSelector((store)=> store.organizations.organization);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(organization, hackathons, totalPeople)
    useEffect(()=>{
        dispatch(fetchOneOrganization(id))
    },[id])
    return (
        <div>
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
                    />
                    <p>{organization.description}</p>
                    <p>{totalPeople}</p>
                    {/*<p>*/}
                    {/*    <ul>*/}
                    {/*        {hackathons.map((hac) => (*/}
                    {/*            <li key={hac.id}>{hac.id}</li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</p>*/}

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