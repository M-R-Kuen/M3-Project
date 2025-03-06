import styles from "../../components/Login/LoginNoUser.module.css";
import { useState } from "react";
import { loginUser } from "../../Redux/reducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import loginValidation from "../../helpers/loginValidation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userLogin, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "username is required",
    password: "password is required",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...userLogin,
      [name]: value,
    });
    setErrors(loginValidation({ ...userLogin, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      postLoginData();
    } else {
      alert("Please fill out the required fields");
    }
  };

  // Axios
  const postLoginData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username: userLogin.username,
        password: userLogin.password,
      });

      dispatch(loginUser(response.data.user.id));
      console.log(response.data.user.id);
      const notify2 = () => {
        toast.success(
          `Login successful. Your username is ${userLogin.username} and your password is ${userLogin.password}`
        );
      };
      notify2();
      console.log(`You are ready to play`, response.data);
      navigate("/myappointments");
    } catch (error) {
      console.log("There was an error logging the user!", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  // Render
  return (
    <div className={`container ${styles.formContainer1}`}>
      <h1 className={`text-center ${styles.title}`}>LOGIN TO SEE BOOKINGS</h1>
      <form id="registerForm2" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="username">Your username</label>
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              id="username2"
              placeholder="Add a username"
              name="username"
              value={userLogin.username}
              onChange={handleChange}
            />
          </div>
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              id="password2"
              placeholder="Add password"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-6 text-center">
            <button
              type="submit"
              id="submit2"
              className={`btn ${styles.btnPrimary}`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
