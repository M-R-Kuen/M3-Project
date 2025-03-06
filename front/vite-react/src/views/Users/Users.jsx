import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import styles from "./Users.module.css";
const Users = () => {
  return (
    <div>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.containerD}`}
      >
        <div>
          <Register />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
};
export default Users;
