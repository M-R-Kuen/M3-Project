enum statusEnum { //es para que solo acepte estos dos valores
  active = "active",
  cancelled = "cancelled",
}

interface IAppointment {
  id: number;
  date: Date;
  time: number;
  userId: number;
  status: statusEnum;
}

export { IAppointment, statusEnum };
