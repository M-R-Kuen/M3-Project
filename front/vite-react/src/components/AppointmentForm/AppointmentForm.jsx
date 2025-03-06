import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../components/AppointmentForm/AppointmentForm.module.css";
import bookingValidation from "../../helpers/bookingValidation";
import { addAppointment, logoutUser } from "../../Redux/reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  // Notifications
  const notify = () => {
    toast.error("You already have two appointments that day");
  };

  const notifyTime = () => {
    toast.warning("Time must be between 08:00 and 20:00");
  };

  const notifyLougout = () => {
    toast.success("You are logged out");
  };

  // State Hooks
  const [appointmentForm, setformAppointment] = useState({
    date: null,
    time: "",
  });

  const [errors, setErrors] = useState({
    date: "date is required",
    time: "time is required and must be between 08:00 and 20:00",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const user = useSelector((state) => state.user);
  const userAppointment = useSelector((state) => state.user.userAppointment);
  const userId = user.user;

  // Event Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformAppointment({
      ...appointmentForm,
      [name]: value,
    });
    setErrors(bookingValidation({ ...appointmentForm, [name]: value }));
  };

  const handleDateChange = (date) => {
    setformAppointment({
      ...appointmentForm,
      date: date,
    });
    setErrors(bookingValidation({ ...appointmentForm, date: date }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      // Check if user already has two appointments on the same day
      const appointmentsOnSameDay = userAppointment.filter(
        (appointment) =>
          new Date(appointment.date).toDateString() ===
          new Date(appointmentForm.date).toDateString()
      );

      if (appointmentsOnSameDay.length > 2) {
        notify();
        return;
      }

      dispatch(addAppointment(appointmentForm));
      postAppointmentData();
    } else {
      notifyTime();
    }
  };

  // AXIOS
  const postAppointmentData = async () => {
    const formatDate = (date) => {
      const d = new Date(date);
      const month = `${d.getMonth() + 1}`.padStart(2, "0");
      const day = `${d.getDate()}`.padStart(2, "0");
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        {
          date: formatDate(appointmentForm.date),
          time: appointmentForm.time,
          userId: userId,
        }
      );
      dispatch(addAppointment(response.data.newAppointment));
      alert(
        `You are ready to play. Your appointment is on ${appointmentForm.date.toLocaleDateString(
          "en-US"
        )} at ${appointmentForm.time}`
      );
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 400) {
        notify();
      } else {
        alert("Error al crear la cita");
      }
    }
  };

  // Logout Handler
  const logOut = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken"); // Elimina el token del almacenamiento local
    notifyLougout();
    navigate("/");
  };

  const goProfile = () => {
    navigate("/users");
  };

  // Render
  return (
    <div className={`container ${styles.formContainer1}`}>
      <h1 className={`text-center ${styles.title}`}>
        COMPLETE TO MAKE YOUR BOOKING, REMEMBER OUR OPENING TIME IS FROM 8AM TO
        8PM
      </h1>
      <form id="registerForm2" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="username">Your date</label>
            <DatePicker
              selected={appointmentForm.date}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="mm/dd/yyyy"
              className={`form-control ${styles.formControl}`}
              id="date"
              name="date"
            />
          </div>
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              className={`form-control ${styles.formControl}`}
              id="time"
              placeholder="Add time"
              name="time"
              value={appointmentForm.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-6 text-center">
            <button
              type="submit"
              id="submit3"
              className={`btn ${styles.btnPrimary}`}
            >
              Submit
            </button>
          </div>
          <div className="col-sm-6 text-center">
            <button
              type="button"
              id="logout"
              className={`btn ${styles.btnPrimary}`}
              onClick={logOut}
            >
              Logout
            </button>
          </div>
          <div className="col-sm-6 text-center">
            <button
              type="button"
              id="profile"
              className={`btn ${styles.btnTwo}`}
              onClick={goProfile}
            >
              View profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
