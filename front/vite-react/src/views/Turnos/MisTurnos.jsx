import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import Appointment from "../../components/Appointment/Appointment";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";

import styles from "../../components/Appointment/appointment.module.css";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.user); //me traigo el estado inicial
  console.log(user);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${user.user}` //seria solo user
        );
        setAppointments(response.data.user.appointments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.appointmentForm}>
        <AppointmentForm />
      </div>
      <div className={styles.appointmentContainer}>
        <section>
          <div className={styles.appointments}>
            {appointments.map((appointment) => (
              <Appointment key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MisTurnos;
