import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchHackathonById } from '@/redux/features/hackathonsSlice.js';
import styles from './style.module.scss';
import { createTeam, sendInvite } from '@/redux/features/teamSlice.js';
import { getAllUsersThunk } from "@/redux/features/userSlice.js";

const StartHackathonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const hackathon = useSelector(state => state.hackathons.hackathon);
    const teamState = useSelector(state => state.team); // Здесь teamState не используется, возможно, вам понадобится использовать его позже
    const [teamName, setTeamName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const allUsers = useSelector(state => state.userStore.allUsers);
    const [newTeamId, setNewTeamId] = useState(null);
    useEffect(() => {
        dispatch(fetchHackathonById(id));
        dispatch(getAllUsersThunk());
    }, [dispatch, id]);

    const filteredUsers = allUsers ? allUsers.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInviteEmail(value);
        setSearchTerm(value.trim());
    };

    const handleUserClick = (email) => {
        setInviteEmail(email);
        setSearchTerm('');
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const { payload: { id: newTeamId } } = await dispatch(createTeam({ name: teamName, hackathonId: id }));
            console.log('newTeamId:', newTeamId);
            setNewTeamId(newTeamId);
            return newTeamId;
        } catch (error) {
            console.error('Failed to create team:', error);
        }
    };

    const handleSendInvite = async () => {
        try {
            await dispatch(sendInvite({ teamId: newTeamId, member: inviteEmail, hackathonId: id }));
            console.log('newTeamId:', newTeamId);
        } catch (error) {
            console.error('Failed to send invite:', error);
        }
    };

    const handleTasksClick = () => {
        navigate(`/hackathon/${id}/tasks`);
    };

    if (!hackathon) {
        return <div>Loading...</div>;
    }

    const currentDate = new Date();
    const startDate = new Date(hackathon.start);

    if (currentDate < startDate) {
        return <div>Hackathon has not started yet. Please wait until it starts in {startDate.getDate()}.</div>;
    }

    return (
        <div>
            <h1>{hackathon.name}</h1>
            <p>{hackathon.description}</p>
            <p>{hackathon.rules}</p>
            <div className={styles.team}>
                <h2>Gather your team!</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const newTeamId = await handleCreateTeam(e);
                }}>
                    <input placeholder="Create name of your team" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                    <button type="submit">Save</button>
                </form>
                <h3>Team members</h3>
                <div className={styles.member}>
                    <img alt="Team member" />
                    <div>
                        <h4>Name</h4>
                        <h5>Email</h5>
                    </div>
                    <p>Status</p>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSendInvite();
                }}>
                    <input
                        placeholder="Invite new member"
                        value={inviteEmail}
                        onChange={handleInputChange}
                    />
                    {searchTerm && (
                        <ul>
                            {filteredUsers.map(user => (
                                <li key={user.id} onClick={() => handleUserClick(user.email)}>
                                    {user.username} - {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button type="submit">Send invite</button>
                </form>
            </div>
            <button onClick={handleTasksClick}>Go to Tasks</button>
        </div>
    );
};

export default StartHackathonPage;
