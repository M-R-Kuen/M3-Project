import IUser from "../interfaces/IUser";
import {
  createCredentialsService,
  checkCredentialsService,
} from "../services/credentialsServices";

import CredentialDto from "../interfaces/dto/credentialDto";
import { Users } from "../entities/UsersE";
import { CredentialModel, UserModel } from "../config/AppdataSource";
import UserDto from "../interfaces/dto/userDto";
import { DataSource, QueryRunner } from "typeorm";
import { AppDataSource } from "../config/AppdataSource";

const dataBaseUsers: IUser[] = [];
let id = 1;

export const getUsersService = async (): Promise<Users[]> => {
  const users = await UserModel.find({ relations: { appointments: true } });
  return users;
};

export const getUserByIdService = async (id: number): Promise<Users | null> => {
  const userById = await UserModel.findOne({
    where: { id },
    relations: { appointments: true },
  });
  return userById;
};

export const createUserService = async (
  user: UserDto,
  credential: CredentialDto
) => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();

  // Inicia la transacción
  await queryRunner.startTransaction();

  try {
    // Crea el usuario
    const newUser = UserModel.create(user);
    //pregunto si el usuarname existe
    const userExists = await CredentialModel.findOne({
      where: { username: credential.username },
    });
    if (userExists) {
      throw new Error("Username already exists");
    } else {
      // Crea las credenciales
      const newCredential = await createCredentialsService(credential);
      newUser.credentialsId = newCredential;
      // Guarda el nuevo usuario en la base de datos
      await queryRunner.manager.save(newUser);
    }
    // Confirma la transacción
    await queryRunner.commitTransaction();

    return newUser;
  } catch (error) {
    // Si ocurre un error, deshace la transacción
    await queryRunner.rollbackTransaction();
    console.error("Error creating user service:", error);
    throw new Error("Error creating user service");
  } finally {
    // Libera el queryRunner
    await queryRunner.release();
  }
};

export const loginUserService = async (
  username: string,
  password: string
): Promise<number | null> => {
  const credentialId = await checkCredentialsService(username, password);
  return credentialId;
};

// export const deleteUserByIdService = async (id: number): Promise<void> => {
//   const users = await getUsersService();
//   const user = await UserModel.findOneBy({ id });
//   if (user) {
//     users.splice(users.indexOf(user), 1);
//   }
// };
