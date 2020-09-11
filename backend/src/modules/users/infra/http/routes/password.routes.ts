import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPassswordController";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
// Rota: Receber a requisição, chamr outro arquivo, e devolver uma resposta

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", forgotPasswordController.create);
passwordRouter.post("/reset", resetPasswordController.create);

export default passwordRouter;
