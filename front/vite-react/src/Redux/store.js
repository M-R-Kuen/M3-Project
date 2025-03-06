import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducer";

const store = configureStore({
  reducer: {
    user: userSlice.reducer, //puedo solo tener {reducer:userslice.reducer} y en mis turnos
  },
});

export default store;
