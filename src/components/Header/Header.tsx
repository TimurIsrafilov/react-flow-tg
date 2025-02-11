import styles from './Header.module.css';

function Header(): React.JSX.Element {
  return (
    <div className={styles.header}>
      <h1>Company chart</h1>
    </div>
  );
}

export default Header;
