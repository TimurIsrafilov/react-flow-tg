import { useNavigate } from 'react-router-dom';

import styles from './profilePage.module.css';

import Profile from '../../components/Profile/Profile';

function ProfilePage(): React.JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>Profile detail information</h2>
        <button onClick={handleClick}>Back</button>
      </div>
      <Profile />
    </div>
  );
}

export default ProfilePage;
