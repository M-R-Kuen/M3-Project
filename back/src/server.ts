import express from "express";
import router from "./routes";
import multer = require("multer");
import path = require("path");
const server = express();
import cors from "cors";
import morgan from "morgan";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/uploads", express.static(path.join(__dirname, "../uploads")));

server.use(router);

export default server;
