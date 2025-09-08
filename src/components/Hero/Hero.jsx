import styles from "./Hero.module.css";
import Button from "../Button/Button.jsx";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const viewNow = () => {
    navigate("/catalog");
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Button text="View Now" onClick={viewNow} className="showMoreCard" />
      </div>
    </div>
  );
}

export default Hero;
