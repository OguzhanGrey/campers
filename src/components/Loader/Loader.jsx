import styles from "./Loader.module.css";

function Loader({ size = "medium", text = "Loading..." }) {
  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.loader} ${styles[size]}`}>
        <div className={styles.loaderSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
      </div>
      {text && <p className={styles.loaderText}>{text}</p>}
    </div>
  );
}

export default Loader;
