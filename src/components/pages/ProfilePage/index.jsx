import styles from './styles.module.scss';
import avatarexample from '@/assets/avatarexample.png';
import { useSelector } from "react-redux";

const ProfilePage = () => {
	
	const { userInfo } = useSelector(state => state.userStore);
	if (!userInfo) return <div>Loading...</div>;
	return <div>
		<div className={styles.topPlain}>
			<div className={styles.hello}>Hello, {userInfo.username} 👋🏼,</div>
		</div>
		<div className={styles.avatarBox}>
			<div className={styles.avatarWrapper}>
				<div className={styles.avatar}>
					<img src={avatarexample} />
				</div>
				<div className={styles.textWrapper}>
					<div className={styles.name}>{userInfo.username}</div>
					<div className={styles.email}>{userInfo.email}</div>
				</div>
			</div>
		</div>
	</div>
};

export default ProfilePage;
