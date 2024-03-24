import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchHackathonById } from '@/redux/features/hackathonsSlice.js';
import styles from './style.module.scss';
import { createTeam, sendInvite } from '@/redux/features/teamSlice.js';

const StartHackathonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const hackathon = useSelector(state => state.hackathons.hackathon);
    const teamState = useSelector(state => state.team);
    const [teamName, setTeamName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');

    useEffect(() => {
        dispatch(fetchHackathonById(id));
    }, [dispatch, id]);

    if (!hackathon) {
        return <div>Loading...</div>;
    }

    const currentDate = new Date();
    const startDate = new Date(hackathon.start);

    if (currentDate < startDate) {
        return <div>Hackathon has not started yet. Please wait until it starts in {startDate.getDate()}.</div>;
    }

    let newTeamId;

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const { payload } = await dispatch(createTeam({ name: teamName }));
            console.log(teamName)
            newTeamId = payload.id;
        } catch (error) {
            console.error('Failed to create team:', error);
        }
    };

    const handleSendInvite = async (e) => {
        e.preventDefault();
        try {
            await dispatch(sendInvite({ teamId: newTeamId, userId: inviteEmail }));
        } catch (error) {
            console.error('Failed to send invite:', error);
        }
    };

    const handleTasksClick = () => {
        navigate(`/hackathon/${id}/tasks`);
    };

    return (
        <div>
            <h1>{hackathon.name}</h1>
            <p>{hackathon.description}</p>
            <p>{hackathon.rules}</p>
            <p>{startDate.getDate()}</p>
            <div className={styles.team}>
                <h2>Gather your team!</h2>
                <form onSubmit={handleCreateTeam}>
                    <input placeholder={'Create name of your team'} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
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
                <form onSubmit={handleSendInvite}>
                    <input placeholder={'Invite new member'} value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
                    <button type="submit">Send invite</button>
                </form>
            </div>
            <button onClick={handleTasksClick}>Go to Tasks</button>
        </div>
    );
};

export default StartHackathonPage;
