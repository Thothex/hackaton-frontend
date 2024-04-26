import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Admin from "./admin.jsx";
import Org from './org.jsx';
import User from './user.jsx';

const OrganizationsPage = () =>{
    const { userInfo } = useSelector((state) => state.userStore);
    if(userInfo.role === 'admin'){
        return(
            <Admin/>

        )
    } else if (userInfo.role !== 'admin' && userInfo.isOrg) {
        return(
                <Org/>
        )

    } else {
        return(
            <User/>
        )
    }

}

export default OrganizationsPage;