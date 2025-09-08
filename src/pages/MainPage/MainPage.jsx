import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import styles from "./MainPage.module.css";
import Container from "../../components/Container/Container";

function MainPage() {
  return (
    <div className={styles.mainPage}>
      <Container>
        <Header />
        <Hero />
      </Container>
    </div>
  );
}

export default MainPage;
