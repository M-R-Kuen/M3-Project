import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./appointment.module.css";
import { updateAppointment } from "../../Redux/reducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointment = ({ appointment: { date, time, status, id } }) => {
  const notify = () => toast.success("Appointment deleted successfully");

  const dispatch = useDispatch();

  // Helper Functions
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Event Handlers
  const updateAppointmentData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/appointments/cancel/${id}`
      );
      dispatch(updateAppointment({ id, status: "cancelled" }));
      console.log(`Appointment cancelled. Hope to see you soon`, response.data);
      notify();
    } catch (error) {
      console.log("There was an error with your appointment!", error);
      const notify2 = () => {
        toast.error("There was an error with your appointment!");
      };
      notify2();
    }
  };

  // Render
  return (
    <div className={styles.appointmentCard}>
      <h1 className={styles.title}> Appointment Details</h1>
      <p className={styles.subtitle}>
        Date: {formatDate(date)}, Time: {time},{" "}
        <span className={styles.status}>Status: {status}</span>
      </p>
      <button className={styles.btn} onClick={updateAppointmentData}>
        Delete
      </button>
    </div>
  );
};

export default Appointment;
