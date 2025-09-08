import Logo from "../Logo/Logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import Container from "../Container/Container.jsx";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.flexContainer}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <Navigation />
        </div>
      </Container>
    </header>
  );
}

export default Header;
