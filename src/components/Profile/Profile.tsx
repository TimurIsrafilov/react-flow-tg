import { useLocation } from 'react-router-dom';

import styles from './Profile.module.css';

import { users } from '../../utils/mockUsers';
import { useStore } from '../../utils/store';

function Profile(): React.JSX.Element {
  const location = useLocation();
  const lastSegment = location.pathname.split('/').pop();
  const userId = lastSegment ? Number(lastSegment) : null;

  const { userTg } = useStore();

  let currentUser = userId ? users?.find((item) => item.id === userId) : null;

  if (currentUser?.bossId === null) {
    currentUser = {
      ...currentUser,
      first_name: userTg?.first_name || currentUser?.first_name,
      last_name: userTg?.last_name || currentUser?.last_name,
    };
  }

  const boss = users.find((item) => item.id === currentUser?.bossId);
  const team = users.filter((item) => item.bossId === currentUser?.id);

  return (
    <section className={styles.section}>
      <img
        className={styles.user_avatar}
        src={
          currentUser?.bossId === null && userTg?.photo_url
            ? userTg?.photo_url
            : `https://randomuser.me/api/portraits/${currentUser?.gender}/${currentUser?.id}.jpg`
        }
        alt="avatar"
      />
      <div className={styles.user_info}>
        <h3>{`${currentUser?.first_name} ${currentUser?.last_name}`}</h3>
        <p>{`Position: ${currentUser?.position}`}</p>
        <p>{`Grade: ${currentUser?.grade}`}</p>
      </div>
      <div className={styles.text_container}>
        {boss && (
          <>
            <h4>Boss:</h4>
            <div className={styles.text_container}>
              <p>{boss.first_name}</p>
              <p>{boss.last_name}</p>
            </div>
          </>
        )}
      </div>
      <h4>Team:</h4>
      <div>
        {team.length > 0 ? (
          team.map((item) => (
            <div key={item.id} className={styles.text_container}>
              <p>{item.position}</p>
              <h4>{`${item.first_name} ${item.last_name}`}</h4>
            </div>
          ))
        ) : (
          <p>No team members found.</p>
        )}
      </div>
    </section>
  );
}

export default Profile;
