import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerText}>
          <p>
            Find your perfect{" "}
            <span className={styles.developerName}>CAMPER</span>
          </p>
        </div>
        <div className={styles.footerYear}>
          <p>© {new Date().getFullYear()} Oğuzhan Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
