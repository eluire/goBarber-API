import express from "express";
import appointmentsRouter from "./appointments.routes";

const app = express();

app.use(express.json());
//Todas rotas que começam com /appointments vão ser tratadas pelo arquivo "appointmentsRouter"
app.use("/appointments", appointmentsRouter);

export default app;
