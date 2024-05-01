import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import {useEffect} from "react";
import {fetchOrganizations} from "@/redux/features/organizationsSlice.js";

const ManageOrganizations = () => {
    const organizations = useSelector(
        (state) => state.organizations.organizations
    );
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchOrganizations())
    },[]);

    const orgsWithLinks = organizations.map((org) => ({
        id: org.id,
        name: <Link key={org.id} to={`/organizations/${org.id}`}>{org.name}</Link>,
        totalPeople: org.totalPeople,
    })).sort((a,b)=>b.totalPeople - a.totalPeople);


    console.log('1', organizations, '2')
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'People',
            dataIndex: 'totalPeople',
            key: 'totalPeople',
        },
    ];

    return (
        <div>
            <Table dataSource={orgsWithLinks} columns={columns} />
        </div>
    );
};



export default ManageOrganizations;
