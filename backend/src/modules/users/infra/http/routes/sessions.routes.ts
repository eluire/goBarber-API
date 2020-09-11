import { Router } from "express";
import SessionsController from "../controllers/SessionsController";
// Rota: Receber a requisição, chamr outro arquivo, e devolver uma resposta

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.post("/", sessionsController.create);

export default sessionRouter;
