import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import {useEffect} from "react";
import {fetchOrganizations} from "@/redux/features/organizationsSlice.js";
import Loading from "@/components/Loading/index.jsx";

const ManageOrganizations = () => {
    const organizations = useSelector(
        (state) => state.organizations.organizations
    );
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchOrganizations())
    },[]);

    // Проверяем, что organizations существует и является массивом
    let orgsWithLinks;
    if (organizations && Array.isArray(organizations)) {
        orgsWithLinks = organizations.map((org) => ({
            id: org.id,
            name: <Link key={org.id} to={`/organizations/${org.id}`}>{org.name}</Link>,
            totalPeople: org.totalPeople,
        })).sort((a,b)=>b.totalPeople - a.totalPeople);
    }

    if(!organizations){
        return <Loading/>
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'People',
            dataIndex: 'totalPeople',
            key: 'totalPeople',
            align: 'center',
        },
    ];

    return (
        <div>
            <Table dataSource={orgsWithLinks} columns={columns} />
        </div>
    );
};

export default ManageOrganizations;
