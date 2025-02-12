import { useNavigate } from 'react-router-dom';
import { Handle, Position } from '@xyflow/react';

import styles from './User.module.css';

import { useStore } from '../../utils/store';

import { TypeUser } from '../../types/types';

type UserProps = {
  data: TypeUser;
};

function User({ data }: UserProps): React.JSX.Element {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const toggleVisibilityById = useStore((state) => state.toggleVisibilityById);
  const toggledNodes = useStore((state) => state.toggledNodes);
  const isNodeToggled =
    toggledNodes && toggledNodes.includes(data.id.toString());

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
              {`${data.first_name} ${data.last_name}`}
            </h4>
          </div>
        </div>
        {data.grade !== 4 && (
          <Handle type="target" position={Position.Bottom} />
        )}
      </button>

      {data.grade !== 4 && (
        <button
          className={styles.button}
          onClick={() => toggleVisibilityById(data.id.toString())}
        >
          {isNodeToggled ? 'Add' : 'Remove'}{' '}
        </button>
      )}
    </div>
  );
}

export default User;
