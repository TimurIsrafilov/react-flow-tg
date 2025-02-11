import { useNavigate } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';
import { useStore } from '../../utils/store';

import styles from './profilePage.module.css';

function ProfilePage() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>Profile detail information</h2>
        <button onClick={handleClick}>Back</button>
      </div>
      <Profile user={user} />
    </div>
  );
}

export default ProfilePage;
