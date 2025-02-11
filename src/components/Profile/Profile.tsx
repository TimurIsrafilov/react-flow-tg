import styles from './Profile.module.css';

import { users } from '../../utils/mockUsers';

import { TypeUser } from '../../types/types';

type ProfileProps = {
  user: TypeUser;
};

function Profile({ user }: ProfileProps) {
  const boss = users.find((item) => item.id === (user?.bossId || 0));
  const team = users.filter((item) => item.bossId === user?.id);
  console.log(team);

  return (
    <section className={styles.section}>
      <img className={styles.user_avatar} src={user.photo} alt="avatar" />
      <div className={styles.user_info}>
        <h3>{`${user.name} ${user.surname}`}</h3>
        <p>{`position: ${user.position}`}</p>
        <p>{`grade: ${user.grade}`}</p>
      </div>
      <div className={styles.text_container}>
        {boss && (
          <>
            <h4>Boss:</h4>
            <div className={styles.text_container}>
              <p>{boss?.name}</p>
              <p>{boss?.surname}</p>
            </div>
          </>
        )}
      </div>
      <h4>Team:</h4>
      <div>
        {team.map((item) => (
          <div className={styles.text_container}>
            <p>{item.position}</p>
            <h4>{`${item.name} ${item.surname}`}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profile;
