import styles from "./Pricing.module.css";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/bookings");
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${styles.container}`}
    >
      <div className={`text-center p-4 ${styles.card}`}>
        <h1 className={styles.title}>Bronze Member</h1>
        <p className={styles.subtitle}>1 per week</p>
        <p className={styles.subtitle}>06.30 - 22.30</p>
        <p className={styles.subtitle}>includes clean towels</p>
        <p className={styles.subtitle}>6 usd</p>
        <button
          className={`btn btn-primary ${styles.btn}`}
          type="button"
          onClick={handleBook}
        >
          book now
        </button>
      </div>
      <div className={`text-center p-4 ${styles.card}`}>
        <h1 className={styles.title}>Silver Member</h1>
        <p className={styles.subtitle}>3 per week</p>
        <p className={styles.subtitle}>06.30 - 22.30</p>
        <p className={styles.subtitle}>includes clean towels</p>
        <p className={styles.subtitle}>15 usd</p>
        <button
          className={`btn btn-primary ${styles.btn}`}
          type="button"
          onClick={handleBook}
        >
          book now
        </button>
      </div>
      <div className={`text-center p-4 ${styles.card}`}>
        <h1 className={styles.title}>
          Golden <span>Member</span>
        </h1>
        <p className={styles.subtitle}>5 per week</p>
        <p className={styles.subtitle}>06.30 - 22.30</p>
        <p className={styles.subtitle}>includes clean towels</p>
        <p className={styles.subtitle}>22 usd</p>
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
export default Pricing;
