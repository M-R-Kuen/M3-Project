import styles from "./Courts.module.css";
import { useNavigate } from "react-router-dom";

const Courts = () => {
  const navigate = useNavigate();
  const handleBook = () => {
    navigate("/bookings");
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${styles.container}`}
    >
      <div className={`text-center p-4 ${styles.card}`}>
        <h1 className={styles.title}>Padel Interior</h1>
        <p className={styles.subtitle}>
          With air conditioning and changing rooms
        </p>
        <div className={styles.imgInt}></div>
        <button
          className={`btn btn-primary ${styles.btn}`}
          type="button"
          onClick={handleBook}
        >
          book now
        </button>
      </div>
      <div className={`text-center p-4 ${styles.card}`}>
        <h1 className={styles.title}>padel outdoor</h1>
        <p className={styles.subtitle}>
          with natural ventilation and extra grass
        </p>
        <div className={styles.imgOut}></div>
        <button
          className={`btn btn-primary ${styles.btn}`}
          type="button"
          onClick={handleBook}
        >
          book now
        </button>
      </div>
      <div className={`text-center p-4 ${styles.card}`}>
        <h1 className={styles.title}>private classes</h1>
        <p className={styles.subtitle}>
          with our top-rated couches, be ready to hit the court
        </p>
        <div className={styles.imgClass}></div>
        <button
          className={`btn btn-primary ${styles.btn}`}
          type="button"
          onClick={handleBook}
        >
          book now
        </button>
      </div>
    </div>
  );
};
export default Courts;
