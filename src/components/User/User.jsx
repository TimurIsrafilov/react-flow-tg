import { useNavigate } from 'react-router-dom';
import { Handle, Position } from '@xyflow/react';

import styles from './User.module.css';

import { useStore } from '../../utils/store';

function User({ data }) {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const toggleVisibilityById = useStore((state) => state.toggleVisibilityById);
  const sortedIds = useStore((state) => state.sortedIds);

  const handleClick = () => {
    setUser(data);
    navigate(`user/${data.id}`);
  };

  return (
    <div className={styles.user_wrapper}>
      <button className={styles.user} onClick={handleClick}>
        {data.grade !== 1 && <Handle type="source" position={Position.Top} />}
        <div>
          <div className={styles.user_container}>
            <img className={styles.user_avatar} src={data.photo} alt="avatar" />
            <p className={styles.user_position}>{data.position}</p>
            <h4 className={styles.user_name}>
              {`${data.name} ${data.surname}`}
            </h4>
          </div>
        </div>
        {data.grade !== 4 && (
          <Handle type="target" position={Position.Bottom} />
        )}
      </button>
      <button
        className={styles.sort_btn}
        onClick={() => toggleVisibilityById(data.id)}
      >
        {!sortedIds.includes(data.id) ? 'Remove' : 'Add'}
      </button>
    </div>
  );
}

export default User;
