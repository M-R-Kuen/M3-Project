import { DataSource } from "typeorm";
import { Users } from "../entities/UsersE";
import { Credentials } from "../entities/CredentialsE";
import { Appointments } from "../entities/AppointmentsE";
// import {
//   DB_TYPE,
//   DB_HOST,
//   DB_PORT,
//   DB_USERNAME,
//   DB_PASSWORD,
//   DB_DATABASE,
// } from "./envs";

import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  //dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [Users, Credentials, Appointments],
  subscribers: [],
  migrations: [],
});

// Inicializar la fuente de datos y manejar posibles errores
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export const UserModel = AppDataSource.getRepository(Users);
export const AppointmentModel = AppDataSource.getRepository(Appointments);
export const CredentialModel = AppDataSource.getRepository(Credentials);
