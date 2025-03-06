import { Router } from "express";
import multer from "multer";

import usersRouter from "../routes/usersRoute";

import appointmentRouter from "../routes/appointmentRoutes";

const router: Router = Router();
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
router.use("/users", upload.single("profileImg"), usersRouter);

router.use("/appointments", appointmentRouter);

//router.use(/appointment, appointmentRouter)

export default router;
