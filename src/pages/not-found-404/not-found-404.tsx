import styles from './not-found-404.module.css';

function NotFound404(): React.JSX.Element {
  return (
    <div className={styles.error}>
      <h2>Страница не найдена</h2>
      <h3>404</h3>
    </div>
  );
}

export default NotFound404;
