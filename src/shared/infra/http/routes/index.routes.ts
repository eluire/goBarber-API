import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";
import "express-async-errors";

import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import rateLimiter from "../middlewares/rateLimiter";

import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import providersRouter from "@modules/appointments/infra/http/routes/providers.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

//Rota para servir os avatars
app.use("/files", express.static(uploadConfig.uploadsFolder));

//Todas rotas que começam com /appointments vão ser tratadas pelo arquivo "appointmentsRouter"
app.use("/appointments", appointmentsRouter);
app.use("/providers", providersRouter);
app.use("/users", usersRouter);
app.use("/sessions", sessionRouter);
app.use("/password", passwordRouter);
app.use("/profile", profileRouter);

app.use(errors());
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
