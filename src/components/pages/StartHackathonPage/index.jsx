import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useLayoutEffect, useState} from 'react';
import { fetchHackathonById } from '@/redux/features/hackathonsSlice.js';
import styles from './style.module.scss';
import { createTeam, getTeamInfo, sendInvite } from '@/redux/features/teamSlice.js';
import { getAllUsersThunk } from "@/redux/features/userSlice.js";
import mockPic from '../../../assets/avatarexample.png'
const StartHackathonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const hackathon = useSelector(state => state.hackathons.hackathon);
    const teamInfo = useSelector(state => state.team.teamInfo);
    const [teamName, setTeamName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const allUsers = useSelector(state => state.userStore.allUsers);
    const [newTeamId, setNewTeamId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [team, setTeam] = useState({});
    const user = useSelector((state) => state.userStore.userInfo);
    useLayoutEffect(() => {
        setLoading(true);
        dispatch(fetchHackathonById(id));
        dispatch(getAllUsersThunk());
        dispatch(getTeamInfo({ hackathonId: id, userId: user.id }))
            .then((data) => {
                setTeam(data.payload);
                setLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [dispatch, id, user]);
    console.log(team)

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
            console.log('New Team Id:', newTeamId);
            setNewTeamId(newTeamId);
            return newTeamId;
        } catch (error) {
            console.error('Failed to create team:', error);
        }
    };

    const handleSendInvite = async () => {
        try {
            await dispatch(sendInvite({ teamId: team.team.id, member: inviteEmail, hackathonId: id }));
            console.log('newTeamId:', newTeamId);
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
        return <div>Hackathon has not started yet. Please wait until it starts in {startDate.getDate()}.</div>;
    }

    return (
        <div style={{margin:'20px'}}>
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
                {team.team ? (<h2>Your team is: {team.team.name}</h2>)
                :
                    (
                        <>
                            <h2>Gather your team!</h2>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const newTeamId = await handleCreateTeam(e);
                            }}>
                                <input placeholder="Create name of your team" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                                <button type="submit">Save</button>
                            </form>
                        </>
                    )
                }
                {team.team && team.teamUsers.length > 0 && (
                    <div className={styles.members}>
                        <h3>Team members</h3>
                        <hr className={styles.divider} />
                        {teamInfo.teamUsers.map((member, index) => (
                            <div key={index} className={styles.memberList}>
                                <div className={styles.userInfo}>
                                <img src={mockPic}/>
                                    <div className={styles.userInfoText}>
                                    <h4>{member.username}</h4>
                                    <p>{member.email}</p>
                                </div>
                            </div>
                                <div className={styles.role}>
                                    {member.isCaptain ? (<p className={styles.Cap}>Captain</p>) : (<p className={styles.Member}>Member</p>)}
                                    {!member.isCaptain && !member.accepted && <h6 className={styles.invited}>Invited</h6>}
                                    {!member.isCaptain &&member.accepted && <h6 className={styles.accepted}>Accepted</h6>}
                            </div>
                            </div>
                        ))}
                        <form  className={styles.inviteForm} onSubmit={(e) => {
                            e.preventDefault();
                            handleSendInvite();

                        }}>
                            <div  className={styles.inviteFormContainer}>
                            <input
                                className={styles.inviteInput}
                                placeholder="Send invitation to the new member"
                                value={inviteEmail}
                                onChange={handleInputChange}
                            />
                            <button   className={styles.inviteButton} type="submit">🔔</button>
                    </div>
                            {searchTerm && (
                                <ul className={styles.memList}>
                                    {filteredUsers.map(user => (
                                        <li key={user.id} onClick={() => handleUserClick(user.email)}>
                                            {user.username} - {user.email}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartHackathonPage;
