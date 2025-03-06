import { Request, Response, NextFunction } from "express";
import { UserModel } from "../config/AppdataSource";
import CredentialDto from "../interfaces/dto/credentialDto";

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, birthdate, nId, username, password } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "Nombre es requerido y debe ser una cadena de texto" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Correo electrónico es requerido y debe ser válido" });
  }
  if (
    !birthdate ||
    !(new Date(birthdate) instanceof Date) ||
    isNaN(new Date(birthdate).getTime())
  ) {
    return res.status(400).json({
      message: "Fecha de nacimiento es requerida y debe ser una fecha válida",
    });
  }

  if (!nId || isNaN(Number(nId))) {
    return res.status(400).json({
      message: "nId es requerido ",
    });
  }
  if (!username || typeof username !== "string") {
    return res.status(400).json({
      message: "username es requerido y debe ser una cadena de texto",
    });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({
      message: "password es requerido y debe ser una cadena de texto",
    });
  }

  next(); // Si todos los datos son correctos, pasa al siguiente middleware o controlador
};
