import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ProfileController from "../controllers/ProfileController";

// Rota: Receber a requisição, chamr outro arquivo, e devolver uma resposta

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.put("/", profileController.update);
// Utilizo o patch quando vou atualizar apenas uma informação do usuário(funciona como o put nesse caso)
profileRouter.get("/", profileController.show);
export default usersRouter;
