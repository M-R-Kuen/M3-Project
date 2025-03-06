import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/reducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  //NOTIFY

  const notify = () => toast.success("You are logged out");

  //STATES
  const user = useSelector((state) => state.user.user);
  const [profileImage, setProfileImage] = useState("");
  const [userProfile, setUserProfile] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //AXIOS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user}`);
        console.log(response.data.user);
        setUserProfile(response.data.user);
        setProfileImage(response.data.user.profileImg);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  //HELPER
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isAuthenticated = useSelector((state) => !!state.user.user);

  //EVENT HANDLERS

  const logOut = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken"); // Elimina el token del almacenamiento local
    notify();
    navigate("/");
  };

  const goBookingsHandler = () => {
    isAuthenticated ? navigate("/myappointments") : navigate("/bookings");
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileDetails}>
        <h1 className={styles.title}>Hi, {userProfile.name}</h1>

        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
        )}

        <button
          type="button" // Cambiado a button para prevenir la sumisión del formulario
          id="logout"
          className={`btn ${styles.btnPrimary}`}
          onClick={logOut}
        >
          Logout
        </button>

        <button
          type="button" // Cambiado a button para prevenir la sumisión del formulario
          id="bookings"
          className={`btn ${styles.btnPrimary}`}
          onClick={goBookingsHandler}
        >
          Bookings
        </button>
      </div>
      <div className={styles.profileDetailsTwo}>
        <p className={styles.profileText}>
          <strong>Name: </strong>
          {userProfile.name}

          <strong>Email: </strong>
          {userProfile.email}

          <strong>Birthdate: </strong>
          {formatDate(userProfile.birthdate)}

          <strong>ID Number: </strong>
          {userProfile.nId}
        </p>
      </div>
    </div>
  );
};

export default Profile;
