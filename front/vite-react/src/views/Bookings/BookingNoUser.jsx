import styles from "../../views/Bookings/BookingNoUser.module.css";
import LoginNoUser from "../../components/Login/LoginNoUser";

const BookingNoUser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <LoginNoUser />
      </div>
    </div>
  );
};

export default BookingNoUser;
