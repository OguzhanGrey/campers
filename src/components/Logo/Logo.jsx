import logo from "../../images/logo/Logo.svg";
import routes from "../../routes.js";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to={routes.home} className={styles.logoLink}>
      <img src={logo} alt="Campers Logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
