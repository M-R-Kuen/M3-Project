import { Router } from "express";
import {
  createAppointmentController,
  getAppointmentController,
  changeAppointmentController,
  getAppointmentByIdController,
  deleteAppointmentController,
} from "../controllers/appointmentControllers";
import { validateAppointmentData } from "../middlewares/appointmentMiddleware";
const appointmentRouter = Router();

appointmentRouter.get("/", getAppointmentController);
appointmentRouter.post(
  "/schedule",
  validateAppointmentData,
  createAppointmentController
);
//usersRouter.post("/",loginUserController);

//appointmentRouter.put("/:id", deleteAppointmentController);
appointmentRouter.get("/:id", getAppointmentByIdController);
appointmentRouter.put("/cancel/:id", changeAppointmentController);
appointmentRouter.delete("/:id", deleteAppointmentController);

export default appointmentRouter;
