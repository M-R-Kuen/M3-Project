import { Request, Response } from "express";
import CredentialDto from "../interfaces/dto/credentialDto";
import UserDto from "../interfaces/dto/userDto";
import {
  createUserService,
  getUsersService,
  getUserByIdService,
  loginUserService,
} from "../services/usersServices";
import { Users } from "../entities/UsersE";
import { UserModel } from "../config/AppdataSource";

// Controlador para crear un nuevo usuario
export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, birthdate, nId, username, password } = req.body;
  const newCredential: CredentialDto = { username, password };
  const newUser: UserDto = { name, email, birthdate, nId };

  const photoPath = req.file
    ? `http://localhost:3000/uploads/${req.file.filename}`
    : undefined;

  try {
    const user: Users = await createUserService(
      { ...newUser, profileImg: photoPath },
      newCredential
    );

    if (!user) {
      res.status(400).json({ message: "Usuario no creado" });
      return;
    }

    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los usuarios
export const getUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json({ message: "Aquí tienes tus usuarios", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para obtener un usuario por ID
export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(Number(id));

    if (!user) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({ message: "Aquí tienes tu usuario", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para eliminar un usuario
export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const users = await getUsersService();
    const numberUser = Number(id);
    const user = await UserModel.findOne({ where: { id: numberUser } });

    if (user) {
      users.splice(users.indexOf(user), 1);
    }

    res.status(200).send({ message: "Usuario eliminado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para iniciar sesión de usuario
export const loginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const userId = await loginUserService(username, password);

    if (!userId) {
      res.status(400).json({ message: "Datos incorrectos" });
      return;
    }

    const user = await getUserByIdService(userId);
    res.status(200).send({ message: "Usuario logueado", login: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
