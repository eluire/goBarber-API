import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import AppointmentController from "../controllers/AppointmentsController";
// Rota: Receber a requisição, chamr outro arquivo, e devolver uma resposta

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
