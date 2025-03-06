import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Register.module.css";
import userValidation from "../../helpers/userValidations";
import { registerUser } from "../../Redux/reducer";
import swal from "sweetalert";

const Register = () => {
  //STATES
  const [user, setUser] = useState({
    name: "",
    email: "",
    birthdate: "",
    nId: "",
    username: "",
    password: "",
    profileImg: null,
  });

  const [errors, setErrors] = useState({
    name: "name is required",
    email: "email is required",
    birthdate: "birthdate is required",
    nId: "nId is required",
    username: "username is required",
    password: "password is required",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    setErrors(userValidation({ ...user, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      postData();
    } else {
      swal({
        icon: "error",
        title: "Oops...",
        text: "Please fill out the required fields",
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setUser({
      ...user,
      profileImg: file,
    });
    console.log(user.profileImg);
  };

  // AXIOS Calls
  const postData = async () => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("birthdate", user.birthdate);
    formData.append("nId", Number(user.nId));
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("profileImg", user.profileImg);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(registerUser(response.data)); // Guarda la respuesta del servidor en el estado global

      swal({
        icon: "success",
        title: "Success!",
        text: "Register successful. Your username is " + user.username,
      });
      navigate("/bookings");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        //check (la idea era 'user already exsist del service)
        swal({
          icon: "error",
          title: "Oops...",
          text: "Username already exists. Please choose another username.",
        });
      } else {
        console.error("Error registering the user:", error);
        swal({
          icon: "error",
          title: "Oops...",
          text: "Error registering the user. Please try again.",
        });
      }
    }
  };

  // Render
  return (
    <div className={`container ${styles.formContainer2}`}>
      <h1 className={`text-center ${styles.title}`}>REGISTER TO BOOK</h1>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              value={user.name}
              name="name"
              className={`form-control ${styles.formControl}`}
              id="name"
              placeholder="Add name"
              onChange={handleChange}
            />
          </div>
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={user.email}
              name="email"
              className={`form-control ${styles.formControl}`}
              id="email"
              placeholder="example@email.com"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              value={user.birthdate}
              name="birthdate"
              className={`form-control ${styles.formControl}`}
              id="birthdate"
              placeholder="Add birthdate"
              onChange={handleChange}
            />
          </div>
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="nId">ID Number</label>
            <input
              type="number"
              value={user.nId}
              name="nId"
              className={`form-control ${styles.formControl}`}
              id="nId"
              placeholder="Add ID Number"
              onChange={handleChange}
            />
          </div>
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              value={user.username}
              name="username"
              className={`form-control ${styles.formControl}`}
              id="username"
              placeholder="Add username"
              onChange={handleChange}
            />
          </div>
          <div className={`form-group col-md-6 ${styles.formGroup}`}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              value={user.password}
              name="password"
              className={`form-control ${styles.formControl}`}
              id="password"
              placeholder="*******"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className={`form-group col-md-12 ${styles.formGroup}`}>
            <label htmlFor="profileImg">Profile Image</label>
            <input
              type="file"
              className={`form-control ${styles.formControl}`}
              name="profileImg"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-6 text-center">
            <button
              type="submit"
              id="submit"
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

export default Register;
