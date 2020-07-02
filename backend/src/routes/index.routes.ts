import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import uploadConfig from "../config/upload";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionRouter from "./sessions.routes";
import AppError from "../errors/AppError";

const app = express();

app.use(express.json());

//Rota para servir os avatars
app.use("/files", express.static(uploadConfig.directory));

//Todas rotas que começam com /appointments vão ser tratadas pelo arquivo "appointmentsRouter"
app.use("/appointments", appointmentsRouter);
app.use("/users", usersRouter);
app.use("/sessions", sessionRouter);

//middleware para tratar erros globais
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
