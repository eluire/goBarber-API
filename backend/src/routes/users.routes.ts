import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

// Rota: Receber a requisição, chamr outro arquivo, e devolver uma resposta

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});
// Utilizo o patch quando vou atualizar apenas uma informação do usuário(funciona como o put nesse caso)
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    // dados disponiveis em request.file

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;

    return response.json({ user });
  }
);
export default usersRouter;
