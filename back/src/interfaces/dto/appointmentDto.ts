import { Status } from "../../entities/AppointmentsE";
interface AppointmentDto {
  id: number;
  date: Date;
  time: string;
  status: Status;
  userId: number;
}

export { AppointmentDto };
