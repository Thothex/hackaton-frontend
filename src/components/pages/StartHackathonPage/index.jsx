import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchHackathonById } from "@/redux/features/hackathonsSlice.js";
import styles from "./style.module.scss";
import {
    createTeam,
    getTeamInfo,
    sendInvite,
} from "@/redux/features/teamSlice.js";
import { getAllUsersThunk } from "@/redux/features/userSlice.js";
import InvintationBlock from './InvintationBlock';

const StartHackathonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const hackathon = useSelector(state => state.hackathons.hackathon);
    const {teamInfo} = useSelector(state => state.team);
    const { allUsers, userInfo: user } = useSelector(state => state.userStore);
    const [teamName, setTeamName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [newTeamId, setNewTeamId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchHackathonById(id));
        dispatch(getAllUsersThunk());
        dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
            .then((data) => {
                setLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [dispatch, id, user]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        socket.onopen = () => {};
        socket.onmessage = (event) => {
            const teamMessage = JSON.parse(event.data);
            if (+teamMessage.teamId === teamInfo.team.id) {
                dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
            }
        };
        socket.onclose = () => {
            console.log('Connection closed');
        };
        socket.onerror = (error) => {
            console.error('Error:', error);
        };
        return () => {
            socket.close();
        };
    }, [dispatch, id, teamInfo?.team.id, user]);

    const filteredUsers = allUsers
        ? allUsers.filter(
            (user) =>
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInviteEmail(value);
        setSearchTerm(value.trim());
    };

    const handleUserClick = (email) => {
        setInviteEmail(email);
        setSearchTerm("");
    };

    const handleCreateTeam = async () => {
        try {
            const { payload: { id: newTeamId } } = await dispatch(createTeam({ name: teamName, hackathonId: id }));
            setNewTeamId(newTeamId);
            dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
            return newTeamId;
        } catch (error) {
            console.error('Failed to create team:', error);
        }
    };

    const handleSendInvite = async () => {
        try {
            await dispatch(sendInvite({ teamId: teamInfo.team.id, member: inviteEmail, hackathonId: id }));
            dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
            setInviteEmail('');
        } catch (error) {
            console.error('Failed to send invite:', error);
        }
    };

    const handleTasksClick = () => {
        navigate(`/hackathon/${id}/tasks`);
    };

    if (!hackathon || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const currentDate = new Date();
    const startDate = new Date(hackathon.start);

    if (currentDate < startDate) {
        return (
            <div>
                Hackathon has not started yet. Please wait until it starts on {startDate.toDateString()}.
            </div>
        );
    }

    return (
        <div style={{ margin: "20px" }}>
            <div className={styles.hackathonHeader}>
                <div className={styles.hackathonInfo}>
                    <h1>{hackathon.name}</h1>
                    <div className={styles.Info}>
                        <h3>{hackathon.description}</h3>
                        <h4>{hackathon.rules}</h4>
                    </div>
                </div>
                <button className={styles.toTask} onClick={handleTasksClick}>START</button>
            </div>
                <div className={styles.team}>
                    {teamInfo?.team ? (
                        <h2>Your team is: {teamInfo.team.name}</h2>
                    ) : (
                        <>
                            <h2>Gather your team!</h2>
                            <form onSubmit={handleCreateTeam}>
                                <input placeholder="Name your team" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                                <button type="submit">Save</button>
                            </form>
                        </>
                    )}
                    {teamInfo?.teamUsers.length > 0 && (
                        <InvintationBlock
                            styles={styles}
                            teamInfo={teamInfo}
                            handleSendInvite={handleSendInvite}
                            handleInputChange={handleInputChange}
                            inviteEmail={inviteEmail}
                            searchTerm={searchTerm}
                            filteredUsers={filteredUsers}
                            handleUserClick={handleUserClick}
                        />
                    )}
                </div>
            </div>
    );
};

export default StartHackathonPage;
