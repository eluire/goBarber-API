import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

// Rota: Receber a requisição, chamr outro arquivo, e devolver uma resposta

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post("/", usersController.create);
// Utilizo o patch quando vou atualizar apenas uma informação do usuário(funciona como o put nesse caso)
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);
export default usersRouter;
