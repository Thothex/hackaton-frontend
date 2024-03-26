import PropTypes from 'prop-types';
import mockPic from '../../../../assets/avatar.png'

const InvintationBlock = ({
  styles,
  teamInfo,
  handleSendInvite,
  handleInputChange,
  inviteEmail,
  searchTerm,
  filteredUsers,
  handleUserClick
}) => {
  
  return (
    <div className={styles.members}>
    <h3>Team members</h3>
    <hr className={styles.divider} />
    {teamInfo.teamUsers.map((member, index) => (
        <div key={index} className={styles.memberList}>
            <div className={styles.userInfo}>
                <img
                    className={styles.userAvatarImg}
                    src={member?.avatar ? `${import.meta.env.VITE_BASE_URL_AVATAR}/${member.id}/${member.avatar}` : mockPic}/>
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
            name='inviteEmail'
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
  );
};

InvintationBlock.propTypes = {
  styles: PropTypes.object.isRequired,
  teamInfo: PropTypes.object.isRequired,
  handleSendInvite: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  inviteEmail: PropTypes.string, 
  searchTerm: PropTypes.string,
  filteredUsers: PropTypes.array, 
  handleUserClick: PropTypes.func.isRequired,
}

export default InvintationBlock;