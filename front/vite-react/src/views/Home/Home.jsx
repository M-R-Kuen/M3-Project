import styles from "./Home.module.css";
import Carousel from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleBook = () => {
    navigate("/bookings");
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${styles.home}`}
    >
      <div className={`text-center p-4 ${styles.hero}`}>
        <h2 className={styles.subtitle}>Where the</h2>
        <h2 className={styles.title}>real padel</h2>
        <h2 className={styles.subtitle}>begins.</h2>
        <button
          className={`btn btn-primary ${styles.btn}`}
          type="button"
          onClick={handleBook}
        >
          Book Now
        </button>
      </div>
      <Carousel />
    </div>
  );
};

export default Home;
