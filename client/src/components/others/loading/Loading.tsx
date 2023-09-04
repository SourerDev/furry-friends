import styles from './loading.module.css';
const Loading = () => {
  return (
    <div>
      <div className={styles.loader}>
        <div className={styles.wrapper}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.shadow}></div>
          <div className={styles.shadow}></div>
          <div className={styles.shadow}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
