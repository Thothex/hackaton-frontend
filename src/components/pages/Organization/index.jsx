import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchOneOrganization} from "@/redux/features/organizationsSlice.js";
import {useLocation} from "react-router-dom";

const Organization =()=>{
    const organization = useSelector((store)=> store.organizations.organization);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
        dispatch(fetchOneOrganization())
    },[])
    return (
        <div>
<p>{organization.name}</p>
            <img src={organization.picture} alt='' />
            <p>{organization.description}</p>
            <p>{organization.totalPeople}</p>
            <p>{organization.hackathons}</p>
        </div>
    )
}
// Organization.propTypes ={
//     name:PropTypes.string,
//     picture:PropTypes.string,
//     description:PropTypes.string,
//     totalPeople:PropTypes.number,
//     hackathons : PropTypes.array
// }