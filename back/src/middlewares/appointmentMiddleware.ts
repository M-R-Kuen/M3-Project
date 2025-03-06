import { Request, Response, NextFunction } from "express";
import isValidTime from "../helpers/isValidTime";
import { AppointmentModel } from "../config/AppdataSource";

export const validateAppointmentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, time, status, userId } = req.body;

  if (
    !date ||
    !(new Date(date) instanceof Date) ||
    isNaN(new Date(date).getTime())
  ) {
    return res.status(400).json({
      message: "Fecha es requerida y debe ser una fecha válida",
    });
  }

  if (!userId || typeof userId !== "number") {
    return res
      .status(400)
      .json({ message: "userId es requerido y debe ser un numero" });
  }

  const appointmentDate = new Date(date);
  const appointmentTime = parseInt(time.split(":")[0]);
  // Verificar que el usuario no tenga otro turno en el mismo día
  const existingAppointments = await AppointmentModel.find({
    where: {
      user: { id: userId },
      date: appointmentDate,
    },
  });

  if (existingAppointments.length >= 2) {
    return res
      .status(400)
      .json({ message: "User already has two appointment on this date" });
  }

  // Verificar que la fecha del turno sea al menos un día después de la fecha actual
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (appointmentDate <= today) {
    return res.status(400).json({
      message:
        "La fecha del turno debe ser al menos un día después de la fecha actual",
    });
  }

  if (appointmentTime < 8 || appointmentTime >= 20) {
    return res.status(400).json({
      message: "El horario del turno debe estar entre las 08:00 y las 20:00",
    });
  }

  // if (!time || typeof time !== "string" || !isValidTime(time)) {
  //   return res
  //     .status(400)
  //     .json({ message: "hora es requerida y tiene que ser entre 8am y 8pm" });
  // }

  // Verificar que el horario del turno esté dentro del rango permitido

  next();
};
