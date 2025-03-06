import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./views/Home/Home";
import MisTurnos from "./views/Turnos/MisTurnos";
import BookingNoUser from "./views/Bookings/BookingNoUser";
import Navbar from "./components/Navbar/Navbar";
import Pricing from "./views/Pricing/Pricing";
import Courts from "./views/Courts/Courts";

import Users from "./views/Users/Users";
import Profile from "./components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <AppContent />
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => !!state.user.user);

  const getBackgroundClass = (pathname) => {
    if (pathname === "/") {
      return "home-background";
    } else if (pathname === "/bookings") {
      return "bookings2-background";
    } else if (pathname === "/pricing") {
      return "pricing-background";
    } else {
      return "courts-background";
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass(location.pathname)}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Users />} />
        <Route
          path="/myappointments"
          element={
            isAuthenticated ? <MisTurnos /> : <Navigate to="/bookings" />
          }
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/login" element={<BookingNoUser />} />
        <Route
          path="/users"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
