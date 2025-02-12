import styles from './Header.module.css';

import { useStore } from '../../utils/store';
import { useTheme } from '../../hooks/ThemeContext';

function Header(): React.JSX.Element {
  const { userTg, colorThemeTg } = useStore();
  const { toggleTheme } = useTheme();

  return (
    <div className={styles.header}>
      <h3>{`You logged-in as: ${userTg?.first_name} ${userTg?.last_name}`}</h3>
      {colorThemeTg && <h4>{`color theme is: ${colorThemeTg}`}</h4>}
      <button onClick={toggleTheme}>Change theme</button>
    </div>
  );
}

export default Header;
