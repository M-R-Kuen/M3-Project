import { Request, Response } from "express";
import {
  getAppointmentsService,
  createAppointmentService,
  changeAppointmentStatusService,
  getAppointmentByIdService,
  deleteAppointmentService,
} from "../services/appointmentServices";
import { Appointments } from "../entities/AppointmentsE";
import { AppointmentDto } from "../interfaces/dto/appointmentDto";
import { UserModel } from "../config/AppdataSource";
import sendEmail from "../utils/sendEmail";

// Crear una nueva cita
export const createAppointmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const appointmentData: AppointmentDto = req.body;
  try {
    const newAppointment: Appointments = await createAppointmentService(
      appointmentData
    );

    const user = await UserModel.findOne({
      where: { id: appointmentData.userId },
    });
    if (user && user.email) {
      await sendEmail(
        user.email,
        "Your appointment is booked",
        `We will be waiting for you at ${appointmentData.date} at ${appointmentData.time} hrs.`
      );
    }

    res.status(200).json({ message: "Appointment creada", newAppointment });
  } catch (error) {
    res
      .status(400)
      .json({ error: "No se puede crear la appointment, datos incorrectos" });
  }
};

// Obtener todas las citas
export const getAppointmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointments = await getAppointmentsService();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ error: "No se encuentran los appointments" });
  }
};

// Cambiar el estado de una cita
export const changeAppointmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await changeAppointmentStatusService(Number(id));
    res.status(200).json({ message: "Appointment cancelada exitosamente!" });
  } catch (error) {
    res.status(404).json({ error: "El turno no fue encontrado" });
  }
};

// Obtener una cita por ID
export const getAppointmentByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const appointmentFilter = await getAppointmentByIdService(Number(id));
    res.status(200).json({ appointmentFilter });
  } catch (error) {
    res.status(404).json({ error: "No se encuentra la appointment" });
  }
};

// Eliminar una cita
export const deleteAppointmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await deleteAppointmentService(Number(id));
    res
      .status(200)
      .json({ message: "Appointment eliminada exitosamente!", deleted });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar la appointment" });
  }
};
