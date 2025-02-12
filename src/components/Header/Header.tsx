import styles from './Header.module.css';

function Header({ userData }: any): React.JSX.Element {
  return (
    <div className={styles.header}>
      <h1>{userData}</h1>
    </div>
  );
}

export default Header;
