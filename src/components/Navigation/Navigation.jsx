import { NavLink } from "react-router-dom";
import routes from "../../routes.js";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink
        to={routes.home}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to={routes.catalog}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : styles.link
        }
      >
        Catalog
      </NavLink>
    </nav>
  );
}

export default Navigation;
