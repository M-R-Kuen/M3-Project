import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAppointment: [],
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.userAppointment.push(action.payload);
    },

    removeAppointment: (state, action) => {
      state.userAppointment = state.userAppointment.filter(
        (user) => user.id !== action.payload
      );
    },

    updateAppointment: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.userAppointment.find(
        (appointment) => appointment.id === id
      );
      if (appointment) {
        appointment.status = status;
      }
    },

    loginUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload);
    },
    logoutUser: (state) => {
      state.user = null;
    },
    registerUser: (state, action) => {
      state.user = action.payload; // Actualiza el estado con la información del nuevo usuario
    },
  },
});

export const {
  addAppointment,
  removeAppointment,
  loginUser,
  logoutUser,
  registerUser,
  updateAppointment,
} = userSlice.actions;
