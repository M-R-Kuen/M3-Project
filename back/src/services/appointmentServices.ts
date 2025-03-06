import { IAppointment, statusEnum } from "../interfaces/IAppointment";
import IUser from "../interfaces/IUser";
import { getUserByIdService } from "./usersServices";
import { Appointments, Status } from "../entities/AppointmentsE";
import { AppointmentModel, UserModel } from "../config/AppdataSource";
import { AppointmentDto } from "../interfaces/dto/appointmentDto";
import { createUserService } from "./usersServices";
import { Users } from "../entities/UsersE";

const dataBaseAppointments: IAppointment[] = [];
let id = 1;

export const getAppointmentsService = async (): Promise<Appointments[]> => {
  const appointments = await AppointmentModel.find();
  return appointments;
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointments | null> => {
  const appointment = await AppointmentModel.findOneBy({ id });
  return appointment;
};

export const createAppointmentService = async (
  appointment: AppointmentDto
): Promise<Appointments> => {
  appointment.status = Status.completed;
  const newAppointment = AppointmentModel.create(appointment);
  const user = await UserModel.findOne({
    where: { id: appointment.userId },
  });
  if (!user) {
    throw new Error(`User not found for ID ${newAppointment.id}`);
  }

  newAppointment.user = user;
  const savedAppointment = await AppointmentModel.save(newAppointment);

  return savedAppointment;
};

export const changeAppointmentStatusService = async (
  id: number
): Promise<void> => {
  const appointment = await AppointmentModel.findOneBy({ id });

  if (appointment) {
    appointment.status = Status.cancelled;
    AppointmentModel.save(appointment);
  } else {
    throw new Error(`Appointment not found for ID ${id}`);
  }
};

export const deleteAppointmentService = async (id: number): Promise<void> => {
  const appointments = await getAppointmentsService();
  const appointment = await AppointmentModel.findOneBy({ id });
  if (appointment) {
    appointments.splice(appointments.indexOf(appointment), 1);
  }
};
